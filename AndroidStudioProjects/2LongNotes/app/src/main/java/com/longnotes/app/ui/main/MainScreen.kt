package com.longnotes.app.ui.main

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.longnotes.app.data.Note
import com.longnotes.app.data.NoteType
import com.longnotes.app.ui.theme.noteColorToComposeColor
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(
    viewModel: MainViewModel = hiltViewModel(),
    onNoteClick: (Long) -> Unit,
    onNewNoteClick: () -> Unit,
    onManageFoldersClick: () -> Unit,
    onCalendarClick: () -> Unit
) {
    val notes by viewModel.notes.collectAsState()
    val folders by viewModel.folders.collectAsState()
    val selectedFolder by viewModel.selectedFolder.collectAsState()
    val searchQuery by viewModel.searchQuery.collectAsState()
    val sortMode by viewModel.sortMode.collectAsState()
    val viewMode by viewModel.viewMode.collectAsState()
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    var isSearchActive by remember { mutableStateOf(false) }
    var showOptionsMenu by remember { mutableStateOf(false) }
    var showViewSubMenu by remember { mutableStateOf(false) }
    var showFilterDialog by remember { mutableStateOf(false) }

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet {
                Row(
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(onClick = { scope.launch { drawerState.close() } }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Close Drawer")
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Folders", style = MaterialTheme.typography.titleMedium)
                }
                NavigationDrawerItem(
                    label = { Text("All Notes") },
                    selected = selectedFolder == null,
                    onClick = { 
                        viewModel.onFolderSelected(null)
                        scope.launch { drawerState.close() }
                    }
                )
                folders.forEach { folder ->
                    NavigationDrawerItem(
                        label = { Text(folder.name) },
                        selected = selectedFolder?.id == folder.id,
                        onClick = { 
                            viewModel.onFolderSelected(folder)
                            scope.launch { drawerState.close() } 
                        }
                    )
                }
                Divider(modifier = Modifier.padding(vertical = 16.dp))
                NavigationDrawerItem(
                    label = { Text("Manage Folders") },
                    selected = false,
                    onClick = onManageFoldersClick
                )
            }
        }
    ) {
        Scaffold(
            topBar = {
                if (isSearchActive) {
                    SearchBar(
                        query = searchQuery,
                        onQueryChange = { viewModel.onSearchQueryChange(it) },
                        onClose = {
                            isSearchActive = false
                            viewModel.onSearchQueryChange("")
                        }
                    )
                } else {
                    TopAppBar(
                        title = { Text(selectedFolder?.name ?: "Long Notes") },
                        navigationIcon = {
                            IconButton(onClick = { scope.launch { drawerState.open() } }) {
                                Icon(Icons.Default.Menu, contentDescription = "Menu")
                            }
                        },
                        actions = {
                            IconButton(onClick = { isSearchActive = true }) {
                                Icon(Icons.Default.Search, contentDescription = "Search")
                            }
                            Box {
                                IconButton(onClick = { showOptionsMenu = true }) {
                                    Icon(Icons.Default.MoreVert, contentDescription = "Options")
                                }
                                DropdownMenu(
                                    expanded = showOptionsMenu,
                                    onDismissRequest = { showOptionsMenu = false }
                                ) {
                                    DropdownMenuItem(
                                        text = { Text("View") },
                                        onClick = {
                                            showOptionsMenu = false
                                            showViewSubMenu = true
                                        }
                                    )
                                }
                                DropdownMenu(
                                    expanded = showViewSubMenu,
                                    onDismissRequest = { showViewSubMenu = false }
                                ) {
                                    ViewMode.values().forEach { mode ->
                                        DropdownMenuItem(
                                            text = { Text(mode.title) },
                                            onClick = {
                                                viewModel.onViewModeChange(mode)
                                                showViewSubMenu = false
                                            }
                                        )
                                    }
                                }
                            }
                        }
                    )
                }
            },
        ) { padding ->
            Box(modifier = Modifier.fillMaxSize()) {
                Column(modifier = Modifier.padding(padding)) {
                    FilterBar(onClick = { showFilterDialog = true })

                    if (showFilterDialog) {
                        FilterDialog(
                            sortMode = sortMode,
                            onDismiss = { showFilterDialog = false },
                            onSortChange = { viewModel.onSortModeChange(it) }
                        )
                    }

                    when (viewMode) {
                        ViewMode.LIST -> NoteList(notes, viewModel, onNoteClick, viewMode)
                        ViewMode.DETAILS -> NoteList(notes, viewModel, onNoteClick, viewMode)
                        ViewMode.GRID -> NoteGrid(notes, viewModel, onNoteClick, 3, viewMode)
                        ViewMode.LARGE_GRID -> NoteGrid(notes, viewModel, onNoteClick, 2, viewMode)
                    }
                }

                FloatingActionButton(
                    onClick = onCalendarClick,
                    modifier = Modifier.align(Alignment.BottomStart).padding(16.dp)
                ) {
                    Icon(Icons.Default.DateRange, contentDescription = "Calendar")
                }

                FloatingActionButton(
                    onClick = onNewNoteClick,
                    modifier = Modifier.align(Alignment.BottomEnd).padding(16.dp)
                ) {
                    Icon(Icons.Default.Add, contentDescription = "New Note")
                }
            }
        }
    }
}

@Composable
fun FilterBar(onClick: () -> Unit) {
    Column(modifier = Modifier.clickable(onClick = onClick)) {
        Divider()
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp, horizontal = 16.dp),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(text = "Filters", style = MaterialTheme.typography.titleSmall)
        }
        Divider()
    }
}

@Composable
fun FilterDialog(
    sortMode: SortMode,
    onDismiss: () -> Unit,
    onSortChange: (SortMode) -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Sort by") },
        text = {
            Column {
                SortMode.values().forEach { mode ->
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        RadioButton(selected = sortMode == mode, onClick = { onSortChange(mode) })
                        Text(mode.title)
                    }
                }
            }
        },
        confirmButton = { Button(onClick = onDismiss) { Text("Done") } }
    )
}

@Composable
fun SearchBar(query: String, onQueryChange: (String) -> Unit, onClose: () -> Unit) {
    TextField(
        value = query,
        onValueChange = onQueryChange,
        placeholder = { Text("Search notes...") },
        leadingIcon = {
             IconButton(onClick = onClose) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Close Search")
            }
        },
        modifier = Modifier.fillMaxWidth(),
        colors = TextFieldDefaults.colors(unfocusedContainerColor = Color.Transparent)
    )
}

@Composable
fun NoteList(notes: List<Note>, viewModel: MainViewModel, onNoteClick: (Long) -> Unit, viewMode: ViewMode) {
    LazyColumn {
        items(notes) { note ->
            val checklistItems by viewModel.getChecklistItems(note.id).collectAsState(initial = emptyList())
            NoteItem(
                note = note,
                checklistItems = checklistItems,
                onClick = { onNoteClick(note.id) },
                onDeleteClick = { viewModel.deleteNote(note) },
                onPinClick = { viewModel.togglePin(note) },
                viewMode = viewMode
            )
        }
    }
}

@Composable
fun NoteGrid(notes: List<Note>, viewModel: MainViewModel, onNoteClick: (Long) -> Unit, cells: Int, viewMode: ViewMode) {
    LazyVerticalGrid(columns = GridCells.Fixed(cells)) {
        items(notes) { note ->
            val checklistItems by viewModel.getChecklistItems(note.id).collectAsState(initial = emptyList())
            NoteItem(
                note = note, 
                checklistItems = checklistItems, 
                onClick = { onNoteClick(note.id) }, 
                onDeleteClick = { viewModel.deleteNote(note) }, 
                onPinClick = { viewModel.togglePin(note) },
                viewMode = viewMode
            )
        }
    }
}

@Composable
fun NoteItem(
    note: Note,
    checklistItems: List<com.longnotes.app.data.ChecklistItem>,
    onClick: () -> Unit,
    onDeleteClick: () -> Unit,
    onPinClick: () -> Unit,
    viewMode: ViewMode
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = noteColorToComposeColor(note.color))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(text = note.title, style = MaterialTheme.typography.titleMedium)
            
            when (viewMode) {
                ViewMode.DETAILS -> {
                    if (note.type == NoteType.CHECKLIST) {
                        checklistItems.take(5).forEach {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(if (it.checked) Icons.Default.CheckBox else Icons.Default.CheckBoxOutlineBlank, contentDescription = null)
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(text = it.text)
                            }
                        }
                    } else {
                        Text(text = note.content, maxLines = 5, modifier = Modifier.heightIn(max = 100.dp))
                    }
                }
                ViewMode.GRID -> {
                    if (note.type == NoteType.TEXT) {
                        Text(text = note.content, maxLines = 3, modifier = Modifier.heightIn(max = 50.dp))
                    }
                }
                ViewMode.LARGE_GRID -> {
                     if (note.type == NoteType.TEXT) {
                        Text(text = note.content, maxLines = 5, modifier = Modifier.heightIn(max = 100.dp))
                    }
                }
                else -> {}
            }

            Spacer(modifier = Modifier.height(8.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                if (viewMode == ViewMode.LIST || viewMode == ViewMode.DETAILS) {
                     Text(text = SimpleDateFormat("MM/dd/yyyy", Locale.getDefault()).format(Date(note.updatedAt)), style = MaterialTheme.typography.bodySmall)
                }
                Spacer(modifier = Modifier.weight(1f))
                IconButton(onClick = onPinClick) {
                    Icon(Icons.Default.PushPin, contentDescription = "Pin", tint = if (note.pinned) MaterialTheme.colorScheme.primary else Color.Gray)
                }
                IconButton(onClick = onDeleteClick) {
                    Icon(Icons.Default.Delete, contentDescription = "Delete")
                }
            }
        }
    }
}
