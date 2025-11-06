package com.longnotes.app.ui.calendar

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Notes
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.longnotes.app.ui.main.MainViewModel
import com.longnotes.app.ui.main.NoteItem
import com.longnotes.app.ui.main.ViewMode
import io.github.boguszpawlowski.composecalendar.SelectableCalendar
import io.github.boguszpawlowski.composecalendar.rememberSelectableCalendarState
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.util.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CalendarScreen(
    viewModel: CalendarViewModel = hiltViewModel(),
    mainViewModel: MainViewModel = hiltViewModel(),
    onNavigateBack: () -> Unit,
    onNoteClick: (Long) -> Unit,
    onAddNoteForDate: (Long) -> Unit
) {
    val notes by viewModel.notesForSelectedDate.collectAsState(initial = emptyList())
    val selectedDate by viewModel.selectedDate.collectAsState()
    val calendarState = rememberSelectableCalendarState()
    var isDateSelected by remember { mutableStateOf(false) }

    LaunchedEffect(calendarState.selectionState) {
        val date = calendarState.selectionState.selection.firstOrNull()
        if (date != null) {
            val calendar = Calendar.getInstance().apply {
                set(date.year, date.monthValue - 1, date.dayOfMonth)
            }
            viewModel.onDateSelected(calendar)
            isDateSelected = true
        } else {
            isDateSelected = false
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Calendar") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        },
    ) { padding ->
        Box(modifier = Modifier.fillMaxSize().padding(padding)) {
            Column(modifier = Modifier.fillMaxSize()) {
                SelectableCalendar(calendarState = calendarState)

                if (isDateSelected) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = SimpleDateFormat("MMMM dd, yyyy", Locale.getDefault()).format(selectedDate.time),
                            style = MaterialTheme.typography.titleLarge,
                            modifier = Modifier.align(Alignment.CenterHorizontally)
                        )
                        Spacer(modifier = Modifier.height(16.dp))

                        if (notes.isEmpty()) {
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 32.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text("No available notes for ${SimpleDateFormat("MMMM dd, yyyy", Locale.getDefault()).format(selectedDate.time)}")
                            }
                        } else {
                            LazyColumn {
                                items(notes) { note ->
                                    val checklistItems by mainViewModel.getChecklistItems(note.id).collectAsState(initial = emptyList())
                                    NoteItem(
                                        note = note,
                                        checklistItems = checklistItems,
                                        onClick = { onNoteClick(note.id) },
                                        onDeleteClick = { viewModel.deleteNote(note) },
                                        onPinClick = { /* Pinning is disabled in calendar context */ },
                                        viewMode = ViewMode.LIST
                                    )
                                }
                            }
                        }
                    }
                }
            }

            FloatingActionButton(
                onClick = onNavigateBack,
                modifier = Modifier.align(Alignment.BottomStart).padding(16.dp)
            ) {
                Icon(Icons.Default.Notes, contentDescription = "Notes View")
            }
        }
    }
}
