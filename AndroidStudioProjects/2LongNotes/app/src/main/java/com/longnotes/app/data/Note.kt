package com.longnotes.app.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "notes")
data class Note(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String = "",
    val content: String = "",
    val type: NoteType = NoteType.TEXT,
    val color: NoteColor = NoteColor.YELLOW,
    val folderId: Long? = null,
    val pinned: Boolean = false,
    val pinnedToNotification: Boolean = false,
    val reminderDate: Long? = null, // For v3 migration
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis()
)
