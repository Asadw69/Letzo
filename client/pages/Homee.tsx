import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import Stories, { type StoryItem } from "@/components/Stories";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Heart,
  MessageCircle,
  Share,
  Search,
  Menu,
  Home,
  MessageSquare,
  Plus,
  Bell,
  User,
  Smile,
  Calendar,
  Star,
  Box,
  ShoppingBag,
  Briefcase,
  Video,
  MoreHorizontal,
  Bookmark,
  MapPin,
  AlertTriangle,
  Pin,
} from "lucide-react";

// --- Interfaces and Data ---
interface Post {
  id: string;
  username: string;
  userAvatar: string;
  timeAgo: string;
  content: string;
  image?: string;
  video?: string;
  likes: number;
  isLiked: boolean;
  comments: number;
  isBookmarked: boolean;
}

// Data for the new Explore/Discovery page
const discoveryContent = {
  forYou: [
    {
      id: "fy1",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/fy1/400",
    },
    {
      id: "fy2",
      type: "video",
      imageUrl:
        "https://picsum.photos/seed/fy2/400",
    },
    {
      id: "fy3",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/fy3/400",
    },
    {
      id: "fy4",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/fy4/400",
    },
    {
      id: "fy5",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/fy5/400",
    },
    {
      id: "fy6",
      type: "video",
      imageUrl:
        "https://picsum.photos/seed/fy6/400",
    },
    {
      id: "fy7",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/fy7/400",
    },
    {
      id: "fy8",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/fy8/400",
    },
    {
      id: "fy9",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/fy9/400",
    },
  ],
  sports: [
    {
      id: "s1",
      type: "video",
      imageUrl:
        "https://picsum.photos/seed/s1/400",
    },
    {
      id: "s2",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/s2/400",
    },
    {
      id: "s3",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/s3/400",
    },
    {
      id: "s4",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/s4/400",
    },
    {
      id: "s5",
      type: "video",
      imageUrl:
        "https://picsum.photos/seed/s5/400",
    },
  ],
  cooking: [
    {
      id: "c1",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/c1/400",
    },
    {
      id: "c2",
      type: "video",
      imageUrl:
        "https://picsum.photos/seed/c2/400",
    },
    {
      id: "c3",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/c3/400",
    },
    {
      id: "c4",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/c4/400",
    },
  ],
  memes: [
    {
      id: "m1",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/m1/400",
    },
    {
      id: "m2",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/m2/400",
    },
    {
      id: "m3",
      type: "video",
      imageUrl:
        "https://picsum.photos/seed/m3/400",
    },
  ],
  travel: [
    {
      id: "t1",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/t1/400",
    },
    {
      id: "t2",
      type: "video",
      imageUrl:
        "https://picsum.photos/seed/t2/400",
    },
    {
      id: "t3",
      type: "photo",
      imageUrl:
        "https://picsum.photos/seed/t3/400",
    },
  ],
};

const interests = ["For You", "Sports", "Cooking", "Memes", "Travel"];

// --- Component ---
export default function HomePage() {
  // --- Stories Data ---
  const stories: StoryItem[] = [
    { id: "st1", username: "john", avatar: "https://i.pravatar.cc/100?u=john", preview: "https://picsum.photos/seed/story1/300", hasNew: true },
    { id: "st2", username: "sarah", avatar: "https://i.pravatar.cc/100?u=sarah", preview: "https://picsum.photos/seed/story2/300", hasNew: true },
    { id: "st3", username: "mike", avatar: "https://i.pravatar.cc/100?u=mike", preview: "https://picsum.photos/seed/story3/300" },
    { id: "st4", username: "alex", avatar: "https://i.pravatar.cc/100?u=alex", preview: "https://picsum.photos/seed/story4/300", hasNew: true },
    { id: "st5", username: "emily", avatar: "https://i.pravatar.cc/100?u=emily", preview: "https://picsum.photos/seed/story5/300" },
  ];

  // --- State Management ---
  const [activeTab, setActiveTab] = useState("follow");
  const [selectedInterest, setSelectedInterest] = useState("forYou");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      username: "johndoe",
      userAvatar: "https://i.pravatar.cc/150?u=john",
      timeAgo: "2h",
      content: "Perfect morning coffee ☕ Nothing beats this view! Just discovered this amazing little café downtown.",
      image:
        "https://picsum.photos/seed/post1/500/500",
      likes: 124,
      isLiked: false,
      comments: 23,
      isBookmarked: false,
    },
    {
      id: "2",
      username: "sarah_creates",
      userAvatar: "https://i.pravatar.cc/150?u=sarah",
      timeAgo: "4h",
      content:
        "Working on some new art pieces today! Love the creative process 🎨✨ There's something magical about bringing ideas to life.",
      image:
        "https://picsum.photos/seed/post2/500/500",
      likes: 287,
      isLiked: true,
      comments: 45,
      isBookmarked: true,
    },
    {
      id: "3",
      username: "travel_mike",
      userAvatar: "https://i.pravatar.cc/150?u=mike",
      timeAgo: "6h",
      content:
        "Just discovered this amazing hidden gem in the city. Sometimes the best places are right under our noses! 🏛️",
      likes: 89,
      isLiked: false,
      comments: 12,
      isBookmarked: false,
    },
    {
      id: "4",
      username: "foodie_alex",
      userAvatar: "https://i.pravatar.cc/150?u=alex",
      timeAgo: "8h",
      content:
        "Homemade pasta night! 🍝 There's nothing more satisfying than making everything from scratch. Recipe in my bio!",
      image:
        "https://picsum.photos/seed/post3/500/500",
      likes: 156,
      isLiked: true,
      comments: 34,
      isBookmarked: false,
    },
  ]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("letzo-draft-upload");
      if (!raw) return;
      const draft = JSON.parse(raw);
      const base = {
        id: String(Date.now()),
        username: "you",
        userAvatar: "https://i.pravatar.cc/150?u=you",
        timeAgo: "now",
        likes: 0,
        isLiked: false,
        comments: 0,
        isBookmarked: false,
      };
      if (draft.type === "photo") {
        setPosts((p) => [
          { ...base, content: draft.caption || "", image: draft.url },
          ...p,
        ]);
      } else if (draft.type === "video") {
        setPosts((p) => [
          { ...base, content: draft.caption || "", video: draft.url },
          ...p,
        ]);
      } else if (draft.type === "snip") {
        setPosts((p) => [
          { ...base, content: draft.text || "" },
          ...p,
        ]);
      }
      localStorage.removeItem("letzo-draft-upload");
    } catch { }
  }, []);

  // --- Functions ---
  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          }
          : post,
      ),
    );
  };

  const toggleBookmark = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post,
      ),
    );
  };

  // --- Render Helper for Tabs ---
  const TabButton = ({
    tabName,
    children,
    count,
  }: {
    tabName: string;
    children: React.ReactNode;
    count?: number;
  }) => (
    <button
      className={`relative px-4 py-3 font-medium text-sm transition-all duration-300 rounded-xl ${activeTab === tabName
        ? "text-red-600 bg-red-50"
        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        }`}
      onClick={() => setActiveTab(tabName)}
    >
      <div className="flex items-center space-x-1">
        {children}
        {count && (
          <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-600 text-white rounded-full">
            {count}
          </span>
        )}
      </div>
    </button>
  );

  // --- JSX ---
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@300;400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-brand { font-family: 'Inknut Antiqua', serif; }
        .font-ui { font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar-x::-webkit-scrollbar { display: none; }
        .hide-scrollbar-x { -ms-overflow-style: none; scrollbar-width: none; }
        
        .letzo-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .letzo-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .letzo-button-primary {
          background: #dc2626;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.75rem;
          font-weight: 500;
          transition: all 0.2s;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        
        .letzo-button-primary:hover {
          background: #b91c1c;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: scale(0.98);
        }
        
        .letzo-button-ghost {
          color: #6b7280;
          padding: 0.5rem;
          border-radius: 0.75rem;
          transition: all 0.2s;
        }
        
        .letzo-button-ghost:hover {
          background: #f3f4f6;
          color: #374151;
        }
        
        .letzo-input {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: #374151;
          transition: all 0.2s;
        }
        
        .letzo-input.search-input {
          padding-left: 4rem;
        }
        
        .letzo-input:focus {
          outline: none;
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }
        
        .letzo-input::placeholder {
          color: #9ca3af;
        }
        
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        .shadow-glow {
          box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.1), 0 0 20px rgba(220, 38, 38, 0.15);
        }
        
        .gradient-red {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
        }
        
        .bg-surface { background: #fafafa; }
        .text-primary { color: #1f2937; }
        .text-secondary { color: #6b7280; }
        .text-muted { color: #9ca3af; }
        .border-light { border-color: #e5e7eb; }
        .hover-bg { background: #f3f4f6; }
      `}</style>

      <div className="flex flex-col h-screen bg-surface font-ui">
        {/* Header with Enhanced Design */}
        <header className="flex-shrink-0 sticky top-0 bg-white bg-opacity-95 backdrop-blur-md border-b border-light px-4 py-4 z-50" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center">
              <h1 className="font-brand font-semibold text-2xl text-red-600">
                Letzo
              </h1>
            </div>

            <div className="flex items-center space-x-1">
              <TabButton tabName="follow">
                <span>Follow</span>
              </TabButton>
              <TabButton tabName="search">
                <Search size={18} />
              </TabButton>
              <TabButton tabName="snip" count={6}>
                <span>Snip</span>
              </TabButton>
            </div>

            <button className="letzo-button-ghost">
              <Menu size={20} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto max-w-md mx-auto w-full pb-20 hide-scrollbar">
          {/* Follow Tab Content */}
          {activeTab === "follow" && (
            <div className="space-y-6 pt-2">
              {/* Stories */}
              <Stories items={stories} />

              {/* Pinned Help Alert */}
              <div className="mx-4">
                <div className="p-[1px] rounded-2xl" style={{ background: "linear-gradient(135deg, #fde68a, #fca5a5, #c7d2fe)" }}>
                  <div className="letzo-card rounded-2xl p-4 bg-white">
                    <Alert className="border-0 p-0">
                      <div className="flex items-start">
                        <div className="mr-3 text-red-600">
                          <AlertTriangle size={22} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Pin size={16} className="text-red-600" />
                            <AlertTitle className="font-ui font-semibold text-primary">Urgent Help Needed — Blood Donation</AlertTitle>
                          </div>
                          <AlertDescription className="mt-1 text-secondary">
                            O+ blood required near Dehradun today. If you or someone you know can help, please reach out. Every minute counts.
                          </AlertDescription>
                          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                            <MapPin size={16} />
                            <span>Dehradun, Uttarakhand</span>
                          </div>
                          <div className="mt-4 flex items-center gap-2">
                            <button className="letzo-button-primary">Offer help</button>
                            <button className="letzo-button-ghost px-3 py-2">Share</button>
                          </div>
                        </div>
                      </div>
                    </Alert>
                  </div>
                </div>
              </div>
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className={`letzo-card mx-4 overflow-hidden ${index === 0 ? "shadow-glow" : ""
                    }`}
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between p-4 pb-3">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={post.userAvatar}
                          alt={post.username}
                          className="w-12 h-12 rounded-full bg-gray-100"
                          style={{ border: '2px solid #e5e7eb' }}
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-ui font-semibold text-sm text-primary">
                          {post.username}
                        </h3>
                        <p className="font-ui text-xs text-muted">
                          {post.timeAgo} • Following
                        </p>
                      </div>
                    </div>
                    <button className="letzo-button-ghost p-2">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-3">
                    <p className="font-ui text-primary leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Post Video */}
                  {!post.image && post.video && (
                    <div className="relative overflow-hidden">
                      <video
                        src={post.video}
                        className="w-full h-80 object-cover"
                        controls
                      />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${post.isLiked
                            ? "bg-red-50 text-red-600"
                            : "hover:bg-gray-100 text-secondary"
                            }`}
                        >
                          <Heart
                            size={20}
                            className={post.isLiked ? "fill-current" : ""}
                          />
                          <span className="text-sm font-medium">{post.likes}</span>
                        </button>

                        <button className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100 text-secondary transition-colors duration-200">
                          <MessageCircle size={20} />
                          <span className="text-sm font-medium">{post.comments}</span>
                        </button>

                        <button className="letzo-button-ghost p-2">
                          <Share size={20} />
                        </button>
                      </div>

                      <button
                        onClick={() => toggleBookmark(post.id)}
                        className={`p-2 rounded-xl transition-all duration-200 ${post.isBookmarked
                          ? "bg-red-50 text-red-600"
                          : "hover:bg-gray-100 text-secondary"
                          }`}
                      >
                        <Bookmark size={20} className={post.isBookmarked ? "fill-current" : ""} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Search Tab Content */}
          {activeTab === "search" && (
            <div className="space-y-6 pt-4">
              <div className="px-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" size={18} />
                  <input
                    type="text"
                    className="letzo-input search-input w-full"
                    placeholder="Search interests, people, and more..."
                  />
                </div>
              </div>

              {/* Interest Categories */}
              <div className="flex space-x-3 overflow-x-auto pb-2 hide-scrollbar-x pl-4">
                {interests.map((interest) => {
                  const interestKey = interest.toLowerCase().replace(" ", "");
                  return (
                    <button
                      key={interest}
                      onClick={() => setSelectedInterest(interestKey)}
                      className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex-shrink-0 ${selectedInterest === interestKey
                        ? "bg-red-600 text-white"
                        : "bg-white text-secondary hover:text-primary border border-light"
                        }`}
                      style={{
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-3 gap-2 px-4">
                {discoveryContent[
                  selectedInterest as keyof typeof discoveryContent
                ].map((item) => (
                  <div
                    key={item.id}
                    className="aspect-square relative cursor-pointer group rounded-xl overflow-hidden"
                    style={{
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s'
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt="Discovery content"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.type === "video" && (
                      <div className="absolute top-2 right-2 p-1 bg-black bg-opacity-60 rounded-lg backdrop-blur-sm">
                        <Video size={14} className="text-white" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Snip Tab Content */}
          {activeTab === "snip" && (
            <div className="p-4 space-y-4">
              {[
                {
                  icon: <Smile size={18} />,
                  title: "Daily Motivation",
                  desc: "Quick inspirational quotes to kickstart your day and boost your mood.",
                  tags: ["motivation", "wellness", "daily"],
                  color: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                },
                {
                  icon: <Calendar size={18} />,
                  title: "Weekend Plans",
                  desc: "Curated ideas for making the most of your weekend adventures.",
                  tags: ["weekend", "activities", "fun"],
                  color: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
                },
                {
                  icon: <Star size={18} />,
                  title: "Creative Spark",
                  desc: "Art tips and creative challenges to fuel your artistic journey.",
                  tags: ["art", "creativity", "inspiration"],
                  color: "linear-gradient(135deg, #eab308 0%, #f97316 100%)",
                },
                {
                  icon: <Box size={18} />,
                  title: "Tech Updates",
                  desc: "Latest trends, gadget reviews, and digital tips for tech enthusiasts.",
                  tags: ["technology", "gadgets", "innovation"],
                  color: "linear-gradient(135deg, #4b5563 0%, #1f2937 100%)",
                },
                {
                  icon: <ShoppingBag size={18} />,
                  title: "Food Adventures",
                  desc: "Delicious recipes and restaurant recommendations from around the world.",
                  tags: ["food", "recipes", "cooking"],
                  color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                },
                {
                  icon: <Briefcase size={18} />,
                  title: "Self Care",
                  desc: "Mental health tips and wellness routines for a balanced lifestyle.",
                  tags: ["wellness", "self-care", "mindfulness"],
                  color: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="letzo-card p-5 cursor-pointer group hover:scale-102 transition-all duration-300"
                  style={{ transform: 'scale(1)', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center text-white rounded-xl"
                      style={{
                        background: item.color,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-ui font-semibold text-lg text-primary">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p className="font-ui text-secondary mb-4 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium bg-gray-100 text-muted px-3 py-1.5 rounded-full border border-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <BottomNav isHome={true} />
      </div>
    </>
  );
}
