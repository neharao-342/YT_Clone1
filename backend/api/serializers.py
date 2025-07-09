from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Video, Like, Comment, WatchLater, Playlist

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class VideoSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = [
            'id', 'title', 'description', 'video_file', 'thumbnail',
            'views', 'created_at', 'owner', 'comments_count'
        ]
        read_only_fields = ['views', 'created_at', 'owner']

    def get_comments_count(self, obj):
        return obj.comments.count()


class UploadVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['title', 'description', 'video_file', 'thumbnail']


class LikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    video = serializers.PrimaryKeyRelatedField(queryset=Video.objects.all())

    class Meta:
        model = Like
        fields = ['id', 'user', 'video', 'is_like', 'created_at']


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'video', 'content', 'created_at']


class WatchLaterSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    video = VideoSerializer(read_only=True)

    class Meta:
        model = WatchLater
        fields = ['id', 'user', 'video', 'added_at']


class PlaylistSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    videos = VideoSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist
        fields = ['id', 'user', 'name', 'videos', 'created_at']