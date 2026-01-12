import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  content: string;
  timestamp: string;
  isOwn: boolean;
  read: boolean;
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
    if (!newMessage.trim() || !activeConversation) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation) {
        return {
          ...conv,
          lastMessage: newMessage,
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
            },
          ],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage("");
    toast({
      title: t("messages.messageSent"),
      description: t("messages.messageSentDesc"),
    });
  };

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
                      <p className="text-sm">{message.content}</p>
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
              <div className="p-4 border-t border-border/50 bg-card">
                <div className="flex items-end gap-2">
                  <Button size="icon" variant="ghost" className="shrink-0">
                    <Paperclip className="w-5 h-5" />
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
                  />
                  <Button
                    size="icon"
                    variant="hero"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
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
    </div>
  );
};

export default Messages;
