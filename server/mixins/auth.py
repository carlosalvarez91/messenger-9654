from rest_framework import permissions
from django.contrib.auth.middleware import get_user


class ConversationPermissionMixin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user = get_user(request)
        if user.is_anonymous:
            return False
        return obj.user1 == user or obj.user2 == user