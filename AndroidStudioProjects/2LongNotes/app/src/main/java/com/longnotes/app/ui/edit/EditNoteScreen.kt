package com.longnotes.app.ui.edit

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import com.longnotes.app.data.ChecklistItem
import com.longnotes.app.data.NoteColor
import com.longnotes.app.data.NoteType
import com.longnotes.app.ui.theme.noteColorToComposeColor
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EditNoteScreen(
    viewModel: EditNoteViewModel = hiltViewModel(),
    onNavigateBack: () -> Unit
) {
    val note by viewModel.note.collectAsState()
    val folders by viewModel.folders.collectAsState()
    val checklistItems by viewModel.checklistItems.collectAsState()

    val lifecycleOwner = LocalLifecycleOwner.current
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_PAUSE) {
                viewModel.saveNote()
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)

        onDispose {
            lifecycleOwner.lifecycle.removeObserver(observer)
        }
    }

    BackHandler { onNavigateBack() }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(if (note.id > 0) "Edit Note" else "New Note") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.Done, contentDescription = "Done")
                    }
                }
            )
        },
        containerColor = noteColorToComposeColor(note.color)
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            TextField(
                value = note.title,
                onValueChange = { if (it.length <= 150) viewModel.onTitleChange(it) },
                placeholder = { Text("Title") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
                colors = TextFieldDefaults.colors(unfocusedContainerColor = Color.Transparent)
            )

            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("Note Type")
                Spacer(modifier = Modifier.weight(1f))
                Switch(
                    checked = note.type == NoteType.CHECKLIST,
                    onCheckedChange = { isChecked ->
                        viewModel.onNoteTypeChange(if (isChecked) NoteType.CHECKLIST else NoteType.TEXT)
                    }
                )
            }

            if (note.type == NoteType.TEXT) {
                TextField(
                    value = note.content,
                    onValueChange = { viewModel.onContentChange(it) },
                    placeholder = { Text("Start typing...") },
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f),
                    colors = TextFieldDefaults.colors(unfocusedContainerColor = Color.Transparent)
                )
            } else {
                LazyColumn(modifier = Modifier.weight(1f)) {
                    items(checklistItems) { item ->
                        ChecklistItemRow(
                            item = item,
                            onCheckedChange = { viewModel.toggleChecklistItem(item) },
                            onTextChange = { newText -> viewModel.updateChecklistItem(item, newText) },
                            onDelete = { viewModel.deleteChecklistItem(item) }
                        )
                    }
                    item {
                        Button(onClick = { viewModel.addChecklistItem() }) {
                            Text("Add Item")
                        }
                    }
                }
            }

            var showFolders by remember { mutableStateOf(false) }
            Box {
                Row(
                    modifier = Modifier.clickable { showFolders = !showFolders },
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(text = folders.find { it.id == note.folderId }?.name ?: "All Notes")
                    Icon(Icons.Default.ArrowDropDown, contentDescription = "Dropdown")
                }
                DropdownMenu(expanded = showFolders, onDismissRequest = { showFolders = false }) {
                    folders.forEach { folder ->
                        DropdownMenuItem(text = { Text(folder.name) }, onClick = { 
                            viewModel.onFolderChange(folder.id)
                            showFolders = false
                        })
                    }
                }
            }

            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
            ) {
                Text(text = "Pin to notification")
                Spacer(modifier = Modifier.weight(1f))
                Switch(checked = note.pinnedToNotification, onCheckedChange = { viewModel.toggleNotificationPin() })
            }
            
            ColorPalette(onColorChange = { viewModel.onColorChange(it) }, selectedColor = note.color)
        }
    }
}

@Composable
fun ChecklistItemRow(
    item: ChecklistItem,
    onCheckedChange: (Boolean) -> Unit,
    onTextChange: (String) -> Unit,
    onDelete: () -> Unit
) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Checkbox(checked = item.checked, onCheckedChange = onCheckedChange)
        TextField(
            value = item.text,
            onValueChange = onTextChange,
            modifier = Modifier.weight(1f),
            colors = TextFieldDefaults.colors(unfocusedContainerColor = Color.Transparent)
        )
        IconButton(onClick = onDelete) {
            Icon(Icons.Default.Delete, contentDescription = "Delete Item")
        }
    }
}

@Composable
fun ColorPalette(onColorChange: (NoteColor) -> Unit, selectedColor: NoteColor) {
    LazyRow(modifier = Modifier.padding(16.dp)) {
        items(NoteColor.values()) { color ->
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .padding(4.dp)
                    .clip(CircleShape)
                    .background(noteColorToComposeColor(color))
                    .border(2.dp, if (selectedColor == color) MaterialTheme.colorScheme.primary else Color.Transparent, CircleShape)
                    .clickable { onColorChange(color) }
            ) {
                if (selectedColor == color) {
                    Icon(Icons.Default.Check, contentDescription = "Selected", tint = MaterialTheme.colorScheme.primary, modifier = Modifier.align(Alignment.Center))
                }
            }
        }
    }
}
