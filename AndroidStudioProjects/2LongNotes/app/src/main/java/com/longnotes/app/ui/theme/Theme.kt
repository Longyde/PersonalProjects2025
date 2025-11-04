package com.longnotes.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val LightColorPalette = lightColorScheme(
    primary = PrimaryBlue,
    secondary = LightBlue,
    tertiary = DarkBlue
)

@Composable
fun LongNotesTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = LightColorPalette,
        content = content
    )
}
