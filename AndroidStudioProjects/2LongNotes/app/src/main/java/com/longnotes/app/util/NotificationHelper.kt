package com.longnotes.app.util

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import com.longnotes.app.MainActivity
import com.longnotes.app.R
import com.longnotes.app.data.Note

class NotificationHelper(private val context: Context) {

    private val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

    fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Pinned Notes",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            notificationManager.createNotificationChannel(channel)
        }
    }

    fun showPinnedNoteNotification(note: Note) {
        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        val pendingIntent: PendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE)

        val notification = NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.mipmap.ic_launcher) // Using launcher icon for now
            .setContentTitle(note.title)
            .setContentText(note.content)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setContentIntent(pendingIntent)
            .setOngoing(true) // Makes the notification persistent
            .build()

        notificationManager.notify(note.id.toInt(), notification)
    }

    fun removePinnedNoteNotification(noteId: Long) {
        notificationManager.cancel(noteId.toInt())
    }

    companion object {
        private const val CHANNEL_ID = "pinned_notes_channel"
    }
}
