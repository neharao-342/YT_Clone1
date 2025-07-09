from django.contrib import admin
from .models import Video, Like, WatchLater, Comment

class VideoAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'owner', 'views', 'created_at', 'thumbnail_preview')
    list_filter = ('created_at', 'owner')
    search_fields = ('title', 'description', 'owner__username')
    readonly_fields = ('views', 'created_at')
    list_per_page = 20

    def thumbnail_preview(self, obj):
        if obj.thumbnail:
            return f"<img src='{obj.thumbnail.url}' width='100' />"
        return "No Thumbnail"
    thumbnail_preview.allow_tags = True
    thumbnail_preview.short_description = 'Thumbnail'

class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'video', 'is_like', 'created_at')
    list_filter = ('is_like', 'created_at')
    search_fields = ('user__username', 'video__title')

class WatchLaterAdmin(admin.ModelAdmin):
    list_display = ('user', 'video', 'added_at')
    search_fields = ('user__username', 'video__title')

class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'video', 'content', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'video__title', 'content')
    list_per_page = 25

admin.site.register(Video, VideoAdmin)
admin.site.register(Like, LikeAdmin)
admin.site.register(WatchLater, WatchLaterAdmin)
admin.site.register(Comment, CommentAdmin)
