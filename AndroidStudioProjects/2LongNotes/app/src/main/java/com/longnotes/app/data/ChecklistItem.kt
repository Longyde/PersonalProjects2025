package com.longnotes.app.data

import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey

@Entity(
    tableName = "checklist_items",
    indices = [Index("noteId")]
)
data class ChecklistItem(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val noteId: Long,
    val text: String,
    val checked: Boolean = false,
    val position: Int = 0
)
