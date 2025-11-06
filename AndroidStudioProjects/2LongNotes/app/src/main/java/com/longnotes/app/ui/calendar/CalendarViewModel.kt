package com.longnotes.app.ui.calendar

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.longnotes.app.data.Note
import com.longnotes.app.repo.NotesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.launch
import java.util.Calendar
import javax.inject.Inject

@HiltViewModel
class CalendarViewModel @Inject constructor(
    private val notesRepository: NotesRepository
) : ViewModel() {

    private val _selectedDate = MutableStateFlow<Calendar>(Calendar.getInstance())
    val selectedDate: StateFlow<Calendar> = _selectedDate.asStateFlow()

    val notesForSelectedDate: Flow<List<Note>> = _selectedDate.combine(notesRepository.notes()) { date, notes ->
        notes.filter { note ->
            note.reminderDate?.let {
                val noteCalendar = Calendar.getInstance().apply { timeInMillis = it }
                noteCalendar.get(Calendar.YEAR) == date.get(Calendar.YEAR) &&
                noteCalendar.get(Calendar.DAY_OF_YEAR) == date.get(Calendar.DAY_OF_YEAR)
            } ?: false
        }
    }

    fun onDateSelected(date: Calendar) {
        _selectedDate.value = date
    }

    fun addNoteForSelectedDate() {
        viewModelScope.launch {
            val newNote = Note(reminderDate = _selectedDate.value.timeInMillis)
            notesRepository.add(newNote)
        }
    }

    fun deleteNote(note: Note) {
        viewModelScope.launch {
            notesRepository.delete(note)
        }
    }
}
