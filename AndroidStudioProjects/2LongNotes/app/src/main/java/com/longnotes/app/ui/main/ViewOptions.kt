package com.longnotes.app.ui.main

enum class SortMode(val title: String) {
    MODIFIED_TIME("Modified Time"),
    CREATED_TIME("Created Time"),
    ALPHABETICAL("Alphabetical"),
    COLOR("Color")
}

enum class ViewMode(val title: String) {
    LIST("List"),
    DETAILS("Details"),
    GRID("Grid"),
    LARGE_GRID("Large Grid")
}
