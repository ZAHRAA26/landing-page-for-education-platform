import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Check,
  CheckCheck,
  Star,
  Archive,
  Trash2,
  Plus,
  Users,
  MessageCircle,
  Image,
  FileText,
  File,
  X,
  Download,
  Mic,
  Square,
  Play,
  Pause,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface Attachment {
  id: number;
  name: string;
  type: "image" | "document" | "file" | "voice";
  url: string;
  size: string;
  duration?: number;
}

interface Message {
  id: number;
  content: string;
  timestamp: string;
  isOwn: boolean;
  read: boolean;
  attachments?: Attachment[];
}

interface Conversation {
  id: number;
  participant: {
    name: string;
    avatar: string;
    role: "student" | "teacher";
    online: boolean;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  starred: boolean;
  messages: Message[];
}

const Messages = () => {
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeConversation, setActiveConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "starred">("all");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const [playingVoiceId, setPlayingVoiceId] = useState<number | null>(null);

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      participant: {
        name: language === "ar" ? "أحمد محمد" : "Ahmed Mohamed",
        avatar: "A",
        role: "student",
        online: true,
      },
      lastMessage: language === "ar" 
        ? "شكراً لك على الشرح الواضح!" 
        : "Thank you for the clear explanation!",
      lastMessageTime: language === "ar" ? "منذ 5 دقائق" : "5 min ago",
      unreadCount: 2,
      starred: true,
      messages: [
        {
          id: 1,
          content: language === "ar" 
            ? "مرحباً أستاذ، لدي سؤال حول الدرس الأخير" 
            : "Hello teacher, I have a question about the last lesson",
          timestamp: language === "ar" ? "10:30 ص" : "10:30 AM",
          isOwn: false,
          read: true,
        },
        {
          id: 2,
          content: language === "ar" 
            ? "أهلاً أحمد! تفضل بطرح سؤالك" 
            : "Hello Ahmed! Please ask your question",
          timestamp: language === "ar" ? "10:32 ص" : "10:32 AM",
          isOwn: true,
          read: true,
        },
        {
          id: 3,
          content: language === "ar" 
            ? "كيف يمكنني استخدام React Hooks بشكل صحيح؟" 
            : "How can I use React Hooks correctly?",
          timestamp: language === "ar" ? "10:35 ص" : "10:35 AM",
          isOwn: false,
          read: true,
        },
        {
          id: 4,
          content: language === "ar" 
            ? "سؤال ممتاز! React Hooks هي دوال تتيح لك استخدام الحالة وميزات React الأخرى بدون كتابة class. أهم الـ hooks هي useState و useEffect" 
            : "Great question! React Hooks are functions that let you use state and other React features without writing a class. The most important hooks are useState and useEffect",
          timestamp: language === "ar" ? "10:40 ص" : "10:40 AM",
          isOwn: true,
          read: true,
        },
        {
          id: 5,
          content: language === "ar" 
            ? "شكراً لك على الشرح الواضح!" 
            : "Thank you for the clear explanation!",
          timestamp: language === "ar" ? "10:45 ص" : "10:45 AM",
          isOwn: false,
          read: false,
        },
      ],
    },
    {
      id: 2,
      participant: {
        name: language === "ar" ? "سارة أحمد" : "Sarah Ahmed",
        avatar: "S",
        role: "student",
        online: false,
      },
      lastMessage: language === "ar" 
        ? "متى سيتم نشر الدرس القادم؟" 
        : "When will the next lesson be published?",
      lastMessageTime: language === "ar" ? "منذ ساعة" : "1 hour ago",
      unreadCount: 1,
      starred: false,
      messages: [
        {
          id: 1,
          content: language === "ar" 
            ? "مرحباً، أريد أن أسأل عن الدرس القادم" 
            : "Hello, I want to ask about the next lesson",
          timestamp: language === "ar" ? "9:00 ص" : "9:00 AM",
          isOwn: false,
          read: true,
        },
        {
          id: 2,
          content: language === "ar" 
            ? "متى سيتم نشر الدرس القادم؟" 
            : "When will the next lesson be published?",
          timestamp: language === "ar" ? "9:05 ص" : "9:05 AM",
          isOwn: false,
          read: false,
        },
      ],
    },
    {
      id: 3,
      participant: {
        name: language === "ar" ? "محمد علي" : "Mohamed Ali",
        avatar: "M",
        role: "student",
        online: true,
      },
      lastMessage: language === "ar" 
        ? "تم حل المشكلة، شكراً!" 
        : "Problem solved, thanks!",
      lastMessageTime: language === "ar" ? "أمس" : "Yesterday",
      unreadCount: 0,
      starred: false,
      messages: [
        {
          id: 1,
          content: language === "ar" 
            ? "أواجه مشكلة في تشغيل الكود" 
            : "I'm having trouble running the code",
          timestamp: language === "ar" ? "3:00 م" : "3:00 PM",
          isOwn: false,
          read: true,
        },
        {
          id: 2,
          content: language === "ar" 
            ? "ما هي رسالة الخطأ التي تظهر لك؟" 
            : "What error message are you getting?",
          timestamp: language === "ar" ? "3:10 م" : "3:10 PM",
          isOwn: true,
          read: true,
        },
        {
          id: 3,
          content: language === "ar" 
            ? "تم حل المشكلة، شكراً!" 
            : "Problem solved, thanks!",
          timestamp: language === "ar" ? "3:30 م" : "3:30 PM",
          isOwn: false,
          read: true,
        },
      ],
    },
    {
      id: 4,
      participant: {
        name: language === "ar" ? "فاطمة حسن" : "Fatima Hassan",
        avatar: "F",
        role: "student",
        online: false,
      },
      lastMessage: language === "ar" 
        ? "أحتاج مساعدة في المشروع النهائي" 
        : "I need help with the final project",
      lastMessageTime: language === "ar" ? "منذ يومين" : "2 days ago",
      unreadCount: 0,
      starred: true,
      messages: [
        {
          id: 1,
          content: language === "ar" 
            ? "أحتاج مساعدة في المشروع النهائي" 
            : "I need help with the final project",
          timestamp: language === "ar" ? "11:00 ص" : "11:00 AM",
          isOwn: false,
          read: true,
        },
      ],
    },
  ]);

  const currentConversation = conversations.find(c => c.id === activeConversation);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "unread") return matchesSearch && conv.unreadCount > 0;
    if (activeFilter === "starred") return matchesSearch && conv.starred;
    return matchesSearch;
  });

  const handleSendMessage = () => {
    if ((!newMessage.trim() && attachments.length === 0) || !activeConversation) return;

    const messageContent = newMessage.trim() || (
      attachments.length > 0 
        ? (language === "ar" ? `📎 ${attachments.length} مرفقات` : `📎 ${attachments.length} attachment(s)`)
        : ""
    );

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation) {
        return {
          ...conv,
          lastMessage: messageContent,
          lastMessageTime: language === "ar" ? "الآن" : "Just now",
          messages: [
            ...conv.messages,
            {
              id: conv.messages.length + 1,
              content: newMessage,
              timestamp: new Date().toLocaleTimeString(language === "ar" ? "ar-SA" : "en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }),
              isOwn: true,
              read: false,
              attachments: attachments.length > 0 ? [...attachments] : undefined,
            },
          ],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage("");
    setAttachments([]);
    toast({
      title: t("messages.messageSent"),
      description: t("messages.messageSentDesc"),
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "document") => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = [];
    
    Array.from(files).forEach((file, index) => {
      const isImage = file.type.startsWith("image/");
      const url = URL.createObjectURL(file);
      const sizeKB = Math.round(file.size / 1024);
      const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
      
      newAttachments.push({
        id: Date.now() + index,
        name: file.name,
        type: isImage ? "image" : (file.type.includes("pdf") || file.type.includes("document") ? "document" : "file"),
        url,
        size: sizeStr,
      });
    });

    setAttachments(prev => [...prev, ...newAttachments]);
    setShowAttachmentMenu(false);
    
    // Reset file input
    if (e.target) {
      e.target.value = "";
    }
  };

  const removeAttachment = (id: number) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const getAttachmentIcon = (type: "image" | "document" | "file" | "voice") => {
    switch (type) {
      case "image":
        return <Image className="w-4 h-4" />;
      case "document":
        return <FileText className="w-4 h-4" />;
      case "voice":
        return <Mic className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  // Voice recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" 
          ? "لا يمكن الوصول إلى الميكروفون" 
          : "Cannot access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  };

  const cancelRecording = () => {
    stopRecording();
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
  };

  const sendVoiceMessage = () => {
    if (!audioBlob || !activeConversation) return;

    const voiceAttachment: Attachment = {
      id: Date.now(),
      name: language === "ar" ? "رسالة صوتية" : "Voice message",
      type: "voice",
      url: audioUrl!,
      size: `${Math.round(audioBlob.size / 1024)} KB`,
      duration: recordingTime,
    };

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === activeConversation) {
        return {
          ...conv,
          lastMessage: language === "ar" ? "🎤 رسالة صوتية" : "🎤 Voice message",
          lastMessageTime: language === "ar" ? "الآن" : "Just now",
          messages: [
            ...conv.messages,
            {
              id: conv.messages.length + 1,
              content: "",
              timestamp: new Date().toLocaleTimeString(
                language === "ar" ? "ar-SA" : "en-US",
                {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }
              ),
              isOwn: true,
              read: false,
              attachments: [voiceAttachment],
            },
          ],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    toast({
      title: t("messages.messageSent"),
      description: t("messages.voiceMessageSent"),
    });
  };

  const togglePlayRecording = () => {
    if (!audioUrl) return;
    
    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new Audio(audioUrl);
      audioPlayerRef.current.onended = () => setIsPlayingRecording(false);
    }

    if (isPlayingRecording) {
      audioPlayerRef.current.pause();
      setIsPlayingRecording(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlayingRecording(true);
    }
  };

  const playVoiceMessage = (attachmentId: number, url: string) => {
    if (playingVoiceId === attachmentId) {
      // Stop playing
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      setPlayingVoiceId(null);
    } else {
      // Start playing
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      audioPlayerRef.current = new Audio(url);
      audioPlayerRef.current.onended = () => setPlayingVoiceId(null);
      audioPlayerRef.current.play();
      setPlayingVoiceId(attachmentId);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
    };
  }, []);

  const toggleStar = (id: number) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === id ? { ...conv, starred: !conv.starred } : conv
      )
    );
  };

  const deleteConversation = (id: number) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (activeConversation === id) {
      setActiveConversation(null);
    }
    toast({
      title: t("messages.conversationDeleted"),
      description: t("messages.conversationDeletedDesc"),
    });
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <BackArrow className="w-5 h-5" />
              </Link>
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  Edu<span className="text-primary">Learn</span>
                </span>
              </Link>
            </div>
            <h1 className="text-lg font-semibold text-foreground hidden sm:block">
              {t("messages.title")}
            </h1>
            <Button onClick={() => setShowNewMessage(true)} size="sm" variant="hero">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline ms-2">{t("messages.newMessage")}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="pt-16 flex h-[calc(100vh-4rem)]">
        {/* Conversations List */}
        <aside className={`w-full sm:w-80 lg:w-96 bg-card border-${isRTL ? 'l' : 'r'} border-border/50 flex flex-col ${activeConversation && 'hidden sm:flex'}`}>
          {/* Search & Filters */}
          <div className="p-4 border-b border-border/50">
            <div className="relative mb-4">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground`} />
              <Input
                placeholder={t("messages.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${isRTL ? 'pr-10' : 'pl-10'}`}
              />
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={activeFilter === "all" ? "default" : "ghost"}
                onClick={() => setActiveFilter("all")}
                className="flex-1"
              >
                {t("messages.all")}
              </Button>
              <Button
                size="sm"
                variant={activeFilter === "unread" ? "default" : "ghost"}
                onClick={() => setActiveFilter("unread")}
                className="flex-1 relative"
              >
                {t("messages.unread")}
                {totalUnread > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                    {totalUnread}
                  </span>
                )}
              </Button>
              <Button
                size="sm"
                variant={activeFilter === "starred" ? "default" : "ghost"}
                onClick={() => setActiveFilter("starred")}
                className="flex-1"
              >
                <Star className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t("messages.noConversations")}</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversation(conv.id)}
                  className={`p-4 border-b border-border/30 cursor-pointer transition-colors hover:bg-secondary/50 ${
                    activeConversation === conv.id ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {conv.participant.avatar}
                      </div>
                      {conv.participant.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold text-foreground truncate ${conv.unreadCount > 0 ? "font-bold" : ""}`}>
                          {conv.participant.name}
                        </h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate ${conv.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                          {conv.lastMessage}
                        </p>
                        <div className="flex items-center gap-2">
                          {conv.starred && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                          {conv.unreadCount > 0 && (
                            <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Chat Area */}
        <main className={`flex-1 flex flex-col ${!activeConversation && 'hidden sm:flex'}`}>
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border/50 bg-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveConversation(null)}
                    className="sm:hidden p-2 text-muted-foreground hover:text-foreground"
                  >
                    <BackArrow className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {currentConversation.participant.avatar}
                    </div>
                    {currentConversation.participant.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{currentConversation.participant.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {currentConversation.participant.online ? t("messages.online") : t("messages.offline")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleStar(currentConversation.id)}
                  >
                    <Star className={`w-4 h-4 ${currentConversation.starred ? "text-yellow-500 fill-yellow-500" : ""}`} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteConversation(currentConversation.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? (isRTL ? "justify-start" : "justify-end") : (isRTL ? "justify-end" : "justify-start")}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl ${
                        message.isOwn
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-secondary text-foreground rounded-bl-sm"
                      }`}
                    >
                      {/* Attachments */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mb-2 space-y-2">
                          {message.attachments.map((attachment) => (
                            <div key={attachment.id}>
                              {attachment.type === "image" ? (
                                <div 
                                  className="relative cursor-pointer group"
                                  onClick={() => setPreviewImage(attachment.url)}
                                >
                                  <img
                                    src={attachment.url}
                                    alt={attachment.name}
                                    className="rounded-lg max-w-full max-h-48 object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                    <span className="text-white text-sm">{t("messages.viewImage")}</span>
                                  </div>
                                </div>
                              ) : attachment.type === "voice" ? (
                                <div 
                                  className={`flex items-center gap-3 p-3 rounded-lg min-w-[200px] ${
                                    message.isOwn ? "bg-primary-foreground/10" : "bg-background/50"
                                  }`}
                                >
                                  <button
                                    onClick={() => playVoiceMessage(attachment.id, attachment.url)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                      message.isOwn 
                                        ? "bg-primary-foreground/20 hover:bg-primary-foreground/30" 
                                        : "bg-primary/10 hover:bg-primary/20"
                                    }`}
                                  >
                                    {playingVoiceId === attachment.id ? (
                                      <Pause className={`w-5 h-5 ${message.isOwn ? "text-primary-foreground" : "text-primary"}`} />
                                    ) : (
                                      <Play className={`w-5 h-5 ${message.isOwn ? "text-primary-foreground" : "text-primary"}`} />
                                    )}
                                  </button>
                                  <div className="flex-1">
                                    <div className={`h-1 rounded-full ${message.isOwn ? "bg-primary-foreground/30" : "bg-primary/30"}`}>
                                      <div 
                                        className={`h-full rounded-full w-0 ${
                                          playingVoiceId === attachment.id ? "animate-pulse w-full" : ""
                                        } ${message.isOwn ? "bg-primary-foreground" : "bg-primary"}`}
                                        style={{ transition: "width 0.3s" }}
                                      />
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                      <span className={`text-xs ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                        {attachment.duration ? formatDuration(attachment.duration) : "0:00"}
                                      </span>
                                      <Mic className={`w-3 h-3 ${message.isOwn ? "text-primary-foreground/50" : "text-muted-foreground/50"}`} />
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div 
                                  className={`flex items-center gap-2 p-2 rounded-lg ${
                                    message.isOwn ? "bg-primary-foreground/10" : "bg-background/50"
                                  }`}
                                >
                                  {getAttachmentIcon(attachment.type)}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{attachment.name}</p>
                                    <p className={`text-xs ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                      {attachment.size}
                                    </p>
                                  </div>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-6 w-6 shrink-0"
                                    onClick={() => window.open(attachment.url, "_blank")}
                                  >
                                    <Download className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {message.content && <p className="text-sm">{message.content}</p>}
                      <div className={`flex items-center gap-1 mt-1 ${message.isOwn ? "justify-end" : "justify-start"}`}>
                        <span className={`text-xs ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {message.timestamp}
                        </span>
                        {message.isOwn && (
                          message.read ? (
                            <CheckCheck className="w-3 h-3 text-primary-foreground/70" />
                          ) : (
                            <Check className="w-3 h-3 text-primary-foreground/70" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border/50 bg-card space-y-3">
                {/* Attachments Preview */}
                {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="relative group"
                      >
                        {attachment.type === "image" ? (
                          <div className="relative">
                            <img
                              src={attachment.url}
                              alt={attachment.name}
                              className="w-16 h-16 object-cover rounded-lg border border-border"
                            />
                            <button
                              onClick={() => removeAttachment(attachment.id)}
                              className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="relative flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
                            {getAttachmentIcon(attachment.type)}
                            <span className="text-sm max-w-[100px] truncate">{attachment.name}</span>
                            <button
                              onClick={() => removeAttachment(attachment.id)}
                              className="w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Voice Recording UI */}
                {(isRecording || audioUrl) && (
                  <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                    {isRecording ? (
                      <>
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-foreground flex-1">
                          {t("messages.recording")} {formatDuration(recordingTime)}
                        </span>
                        <Button size="sm" variant="ghost" onClick={cancelRecording}>
                          <X className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={stopRecording}>
                          <Square className="w-4 h-4 fill-current" />
                        </Button>
                      </>
                    ) : audioUrl ? (
                      <>
                        <button
                          onClick={togglePlayRecording}
                          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 hover:bg-primary/20 transition-colors"
                        >
                          {isPlayingRecording ? (
                            <Pause className="w-5 h-5 text-primary" />
                          ) : (
                            <Play className="w-5 h-5 text-primary" />
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="h-1 bg-primary/30 rounded-full">
                            <div className={`h-full rounded-full bg-primary ${isPlayingRecording ? "animate-pulse w-full" : "w-0"}`} />
                          </div>
                          <span className="text-xs text-muted-foreground mt-1 block">
                            {formatDuration(recordingTime)}
                          </span>
                        </div>
                        <Button size="sm" variant="ghost" onClick={cancelRecording}>
                          <X className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="hero" onClick={sendVoiceMessage}>
                          <Send className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                        </Button>
                      </>
                    ) : null}
                  </div>
                )}
                
                <div className="flex items-end gap-2">
                  {/* Hidden file inputs */}
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, "image")}
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, "document")}
                  />
                  
                  {/* Attachment Button with Menu */}
                  <div className="relative shrink-0">
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                      disabled={isRecording || !!audioUrl}
                    >
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    
                    {showAttachmentMenu && (
                      <div className={`absolute bottom-full mb-2 ${isRTL ? 'right-0' : 'left-0'} bg-card border border-border rounded-lg shadow-lg overflow-hidden min-w-[160px] z-10`}>
                        <button
                          onClick={() => imageInputRef.current?.click()}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-start"
                        >
                          <Image className="w-4 h-4 text-primary" />
                          <span className="text-sm">{t("messages.attachImage")}</span>
                        </button>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-start"
                        >
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-sm">{t("messages.attachFile")}</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Voice Recording Button */}
                  <Button
                    size="icon"
                    variant={isRecording ? "destructive" : "ghost"}
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={!!audioUrl}
                    className="shrink-0"
                  >
                    {isRecording ? (
                      <Square className="w-5 h-5 fill-current" />
                    ) : (
                      <Mic className="w-5 h-5" />
                    )}
                  </Button>
                  
                  <Textarea
                    placeholder={t("messages.typeMessage")}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[44px] max-h-32 resize-none"
                    rows={1}
                    disabled={isRecording || !!audioUrl}
                  />
                  <Button
                    size="icon"
                    variant="hero"
                    onClick={handleSendMessage}
                    disabled={(!newMessage.trim() && attachments.length === 0) || isRecording || !!audioUrl}
                    className="shrink-0"
                  >
                    <Send className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{t("messages.selectConversation")}</h3>
                <p className="text-muted-foreground">{t("messages.selectConversationDesc")}</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-md">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">{t("messages.newMessage")}</h2>
              <button
                onClick={() => setShowNewMessage(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {t("messages.selectRecipient")}
                </label>
                <div className="relative">
                  <Users className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground`} />
                  <Input
                    placeholder={t("messages.recipientPlaceholder")}
                    className={`${isRTL ? 'pr-10' : 'pl-10'}`}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {t("messages.message")}
                </label>
                <Textarea
                  placeholder={t("messages.messagePlaceholder")}
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setShowNewMessage(false)}
                  className="flex-1"
                >
                  {t("messages.cancel")}
                </Button>
                <Button
                  variant="hero"
                  onClick={() => {
                    setShowNewMessage(false);
                    toast({
                      title: t("messages.messageSent"),
                      description: t("messages.messageSentDesc"),
                    });
                  }}
                  className="flex-1"
                >
                  <Send className={`w-4 h-4 ${isRTL ? "rotate-180 ml-2" : "mr-2"}`} />
                  {t("messages.send")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Dialog */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>{t("messages.imagePreview")}</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Messages;
