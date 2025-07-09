from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from .models import Video, Like, Comment, WatchLater, Playlist
from .serializers import (
    VideoSerializer,
    UploadVideoSerializer,
    LikeSerializer,
    CommentSerializer,
    WatchLaterSerializer,
    PlaylistSerializer
)

from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser




from rest_framework.parsers import MultiPartParser, FormParser

class VideoListCreateView(generics.ListCreateAPIView):
    queryset = Video.objects.all().order_by('-created_at')
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

   
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return UploadVideoSerializer
        return VideoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)



class VideoDetailView(generics.RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.AllowAny]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def like_video(request, video_id):
    video = Video.objects.get(id=video_id)
    like, created = Like.objects.get_or_create(user=request.user, video=video)
    like.is_like = True
    like.save()
    return Response({'message': 'Video liked'}, status=200)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def dislike_video(request, video_id):
    video = Video.objects.get(id=video_id)
    like, created = Like.objects.get_or_create(user=request.user, video=video)
    like.is_like = False
    like.save()
    return Response({'message': 'Video disliked'}, status=200)




class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        video_id = self.kwargs['video_id']
        return Comment.objects.filter(video__id=video_id).order_by('-created_at')

    def perform_create(self, serializer):
        video_id = self.kwargs['video_id']
        video = Video.objects.get(id=video_id)
        serializer.save(user=self.request.user, video=video)




class WatchLaterListCreateView(generics.ListCreateAPIView):
    serializer_class = WatchLaterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WatchLater.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)




class PlaylistViewSet(viewsets.ModelViewSet):
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Playlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)