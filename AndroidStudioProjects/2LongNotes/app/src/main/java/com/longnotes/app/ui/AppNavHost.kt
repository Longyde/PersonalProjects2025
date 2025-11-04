package com.longnotes.app.ui

import androidx.compose.runtime.Composable
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.longnotes.app.ui.edit.EditNoteScreen
import com.longnotes.app.ui.folders.ManageFoldersScreen
import com.longnotes.app.ui.main.MainScreen

@Composable
fun AppNavHost() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "main") {
        composable("main") {
            MainScreen(
                onNoteClick = { noteId ->
                    navController.navigate("edit?noteId=$noteId")
                }, 
                onNewNoteClick = {
                    navController.navigate("edit")
                },
                onManageFoldersClick = {
                    navController.navigate("folders")
                }
            )
        }
        composable(
            route = "edit?noteId={noteId}",
            arguments = listOf(navArgument("noteId") { 
                type = NavType.LongType
                defaultValue = 0L
            })
        ) {
            EditNoteScreen(onNavigateBack = { navController.popBackStack() })
        }
        composable("folders") {
            ManageFoldersScreen(onNavigateBack = { navController.popBackStack() })
        }
    }
}
