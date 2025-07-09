from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    VideoListCreateView,
    VideoDetailView,
    like_video,
    dislike_video,
    CommentListCreateView,
    WatchLaterListCreateView,
    PlaylistViewSet,
)

router = DefaultRouter()
router.register(r'playlists', PlaylistViewSet, basename='playlist')

urlpatterns = [

    path('videos/', VideoListCreateView.as_view(), name='video-list-create'),

   
    path('videos/<int:pk>/', VideoDetailView.as_view(), name='video-detail'),

   
    path('videos/<int:video_id>/like/', like_video, name='like-video'),
    path('videos/<int:video_id>/dislike/', dislike_video, name='dislike-video'),

   
    path('videos/<int:video_id>/comments/', CommentListCreateView.as_view(), name='video-comments'),

    path('watchlater/', WatchLaterListCreateView.as_view(), name='watch-later'),
    
    path('upload/', VideoListCreateView.as_view(), name='video-upload'),

    path('', include(router.urls)),
]