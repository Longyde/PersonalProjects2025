package com.longnotes.app.data

import androidx.room.TypeConverter

class Converters {
    @TypeConverter
    fun fromNoteType(value: NoteType): String {
        return value.name
    }

    @TypeConverter
    fun toNoteType(value: String): NoteType {
        return NoteType.valueOf(value)
    }

    @TypeConverter
    fun fromNoteColor(value: NoteColor): String {
        return value.name
    }

    @TypeConverter
    fun toNoteColor(value: String): NoteColor {
        return NoteColor.valueOf(value)
    }
}
