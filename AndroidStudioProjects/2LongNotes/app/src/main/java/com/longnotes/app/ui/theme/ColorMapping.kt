package com.longnotes.app.ui.theme

import androidx.compose.ui.graphics.Color
import com.longnotes.app.data.NoteColor

fun noteColorToComposeColor(noteColor: NoteColor): Color {
    return when (noteColor) {
        NoteColor.YELLOW -> NoteYellow
        NoteColor.BLUE -> NoteBlue
        NoteColor.RED -> NoteRed
        NoteColor.GREEN -> NoteGreen
        NoteColor.PURPLE -> NotePurple
        NoteColor.GRAY -> NoteGray
    }
}
