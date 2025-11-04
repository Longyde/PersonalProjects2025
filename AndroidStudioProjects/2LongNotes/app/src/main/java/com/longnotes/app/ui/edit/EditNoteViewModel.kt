package com.longnotes.app.ui.edit

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.viewModelScope
import com.longnotes.app.data.ChecklistItem
import com.longnotes.app.data.Folder
import com.longnotes.app.data.Note
import com.longnotes.app.data.NoteColor
import com.longnotes.app.data.NoteType
import com.longnotes.app.repo.NotesRepository
import com.longnotes.app.util.NotificationHelper
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class EditNoteViewModel @Inject constructor(
    application: Application,
    private val notesRepository: NotesRepository,
    private val savedStateHandle: SavedStateHandle
) : AndroidViewModel(application) {

    private val noteId: Long = savedStateHandle.get<Long>("noteId") ?: 0
    private val notificationHelper = NotificationHelper(application)

    private val _note = MutableStateFlow(Note())
    val note: StateFlow<Note> = _note.asStateFlow()

    private val _checklistItems = MutableStateFlow<List<ChecklistItem>>(emptyList())
    val checklistItems: StateFlow<List<ChecklistItem>> = _checklistItems.asStateFlow()

    val folders: StateFlow<List<Folder>> = notesRepository.folders()
        .stateIn(viewModelScope, SharingStarted.Lazily, emptyList())

    init {
        if (noteId > 0) {
            viewModelScope.launch {
                notesRepository.note(noteId).filterNotNull().collect { note ->
                    _note.value = note
                    if (note.type == NoteType.CHECKLIST) {
                        notesRepository.checklist(note.id).collect { items ->
                            _checklistItems.value = items
                        }
                    }
                }
            }
        }
    }

    fun onTitleChange(newTitle: String) {
        _note.value = _note.value.copy(title = newTitle)
    }

    fun onContentChange(newContent: String) {
        _note.value = _note.value.copy(content = newContent)
    }

    fun onColorChange(newColor: NoteColor) {
        _note.value = _note.value.copy(color = newColor)
    }

    fun onFolderChange(folderId: Long?) {
        _note.value = _note.value.copy(folderId = folderId)
    }

    fun onNoteTypeChange(noteType: NoteType) {
        _note.value = _note.value.copy(type = noteType)
    }

    fun addChecklistItem() {
        val newItem = ChecklistItem(noteId = noteId, text = "")
        _checklistItems.value = _checklistItems.value + newItem
    }

    fun updateChecklistItem(item: ChecklistItem, newText: String) {
        val updatedItems = _checklistItems.value.map {
            if (it.id == item.id) it.copy(text = newText) else it
        }
        _checklistItems.value = updatedItems
    }

    fun toggleChecklistItem(item: ChecklistItem) {
        val updatedItems = _checklistItems.value.map {
            if (it.id == item.id) it.copy(checked = !it.checked) else it
        }
        _checklistItems.value = updatedItems
    }

    fun deleteChecklistItem(item: ChecklistItem) {
        _checklistItems.value = _checklistItems.value.filter { it.id != item.id }
    }

    fun toggleNotificationPin() {
        val updatedNote = _note.value.copy(pinnedToNotification = !_note.value.pinnedToNotification)
        _note.value = updatedNote
        if (updatedNote.pinnedToNotification) {
            notificationHelper.showPinnedNoteNotification(updatedNote)
        } else {
            notificationHelper.removePinnedNoteNotification(updatedNote.id)
        }
    }

    fun saveNote() {
        viewModelScope.launch {
            val savedNoteId = if (noteId > 0) {
                notesRepository.update(_note.value)
                noteId
            } else {
                notesRepository.add(_note.value)
            }
            if (_note.value.type == NoteType.CHECKLIST) {
                notesRepository.replaceChecklist(savedNoteId, _checklistItems.value)
            }
        }
    }
}
