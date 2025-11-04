package com.longnotes.app.ui.main

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.longnotes.app.data.ChecklistItem
import com.longnotes.app.data.Folder
import com.longnotes.app.data.Note
import com.longnotes.app.repo.NotesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

@OptIn(ExperimentalCoroutinesApi::class)
@HiltViewModel
class MainViewModel @Inject constructor(
    private val notesRepository: NotesRepository
) : ViewModel() {

    private val _selectedFolder = MutableStateFlow<Folder?>(null)
    val selectedFolder: StateFlow<Folder?> = _selectedFolder.asStateFlow()

    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    private val _viewMode = MutableStateFlow(ViewMode.LIST)
    val viewMode: StateFlow<ViewMode> = _viewMode.asStateFlow()

    val folders: StateFlow<List<Folder>> = notesRepository.folders()
        .stateIn(viewModelScope, SharingStarted.Lazily, emptyList())

    val notes: StateFlow<List<Note>> = combine(_searchQuery, _selectedFolder) { query, folder ->
        val notesFlow = if (query.isNotBlank()) {
            notesRepository.search(query)
        } else {
            if (folder == null) {
                notesRepository.notes()
            } else {
                notesRepository.notesInFolder(folder.id)
            }
        }
        notesFlow
    }.flatMapLatest { it }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    fun getChecklistItems(noteId: Long): Flow<List<ChecklistItem>> {
        return notesRepository.checklist(noteId)
    }

    fun onFolderSelected(folder: Folder?) {
        _selectedFolder.value = folder
    }

    fun onSearchQueryChange(query: String) {
        _searchQuery.value = query
    }

    fun onViewModeChange(viewMode: ViewMode) {
        _viewMode.value = viewMode
    }

    fun deleteNote(note: Note) {
        viewModelScope.launch {
            notesRepository.delete(note)
        }
    }

    fun togglePin(note: Note) {
        viewModelScope.launch {
            notesRepository.update(note.copy(pinned = !note.pinned))
        }
    }
}
