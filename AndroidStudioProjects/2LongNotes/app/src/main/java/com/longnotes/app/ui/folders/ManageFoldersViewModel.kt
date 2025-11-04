package com.longnotes.app.ui.folders

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.longnotes.app.data.Folder
import com.longnotes.app.repo.NotesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ManageFoldersViewModel @Inject constructor(
    private val notesRepository: NotesRepository
) : ViewModel() {

    val folders: StateFlow<List<Folder>> = notesRepository.folders()
        .stateIn(viewModelScope, SharingStarted.Lazily, emptyList())

    fun addFolder(name: String) {
        viewModelScope.launch {
            notesRepository.addFolder(Folder(name = name))
        }
    }

    fun updateFolder(folder: Folder) {
        viewModelScope.launch {
            notesRepository.updateFolder(folder)
        }
    }

    fun deleteFolder(folder: Folder) {
        viewModelScope.launch {
            notesRepository.deleteFolder(folder)
        }
    }
}
