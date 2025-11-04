package com.longnotes.app.ui.folders

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.longnotes.app.data.Folder

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ManageFoldersScreen(
    viewModel: ManageFoldersViewModel = hiltViewModel(),
    onNavigateBack: () -> Unit
) {
    val folders by viewModel.folders.collectAsState()
    var showAddFolderDialog by remember { mutableStateOf(false) }
    var folderToEdit by remember { mutableStateOf<Folder?>(null) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Manage Folders") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        },
        floatingActionButton = {
            FloatingActionButton(onClick = { showAddFolderDialog = true }) {
                Icon(Icons.Default.Add, contentDescription = "Add Folder")
            }
        }
    ) { padding ->
        LazyColumn(modifier = Modifier.padding(padding)) {
            items(folders) { folder ->
                FolderItem(
                    folder = folder,
                    onEditClick = { folderToEdit = folder },
                    onDeleteClick = { viewModel.deleteFolder(folder) }
                )
            }
        }

        if (showAddFolderDialog) {
            AddFolderDialog(
                onDismiss = { showAddFolderDialog = false },
                onConfirm = { name ->
                    viewModel.addFolder(name)
                    showAddFolderDialog = false
                }
            )
        }

        folderToEdit?.let { folder ->
            EditFolderDialog(
                folder = folder,
                onDismiss = { folderToEdit = null },
                onConfirm = { name ->
                    viewModel.updateFolder(folder.copy(name = name))
                    folderToEdit = null
                }
            )
        }
    }
}

@Composable
fun FolderItem(folder: Folder, onEditClick: () -> Unit, onDeleteClick: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(text = folder.name, modifier = Modifier.weight(1f))
        IconButton(onClick = onEditClick) {
            Icon(Icons.Default.Edit, contentDescription = "Edit")
        }
        IconButton(onClick = onDeleteClick) {
            Icon(Icons.Default.Delete, contentDescription = "Delete")
        }
    }
}

@Composable
fun AddFolderDialog(onDismiss: () -> Unit, onConfirm: (String) -> Unit) {
    var name by remember { mutableStateOf("") }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("New Folder") },
        text = {
            TextField(value = name, onValueChange = { name = it }, label = { Text("Folder Name") })
        },
        confirmButton = {
            Button(onClick = { onConfirm(name) }) {
                Text("Add")
            }
        },
        dismissButton = {
            Button(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}

@Composable
fun EditFolderDialog(folder: Folder, onDismiss: () -> Unit, onConfirm: (String) -> Unit) {
    var name by remember { mutableStateOf(folder.name) }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Edit Folder") },
        text = {
            TextField(value = name, onValueChange = { name = it }, label = { Text("Folder Name") })
        },
        confirmButton = {
            Button(onClick = { onConfirm(name) }) {
                Text("Save")
            }
        },
        dismissButton = {
            Button(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}
