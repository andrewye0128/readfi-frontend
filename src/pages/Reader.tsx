import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Settings, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockBooks } from "@/data/mockData";
import { useState } from "react";

export default function Reader() {
  const { bookId, chapterId } = useParams<{
    bookId: string;
    chapterId: string;
  }>();
  const navigate = useNavigate();

  const book = mockBooks.find((b) => b.id === bookId);
  const chapter = book?.chapters.find((c) => c.id === chapterId);

  const [fontSize, setFontSize] = useState(16);
  const [showSettings, setShowSettings] = useState(false);

  if (!book || !chapter) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">找不到章節</p>
          <Button onClick={() => navigate("/")}>返回首頁</Button>
        </div>
      </div>
    );
  }

  const currentIndex = book.chapters.findIndex((c) => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? book.chapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < book.chapters.length - 1
      ? book.chapters[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Reader Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate(`/book/${bookId}`)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h2 className="font-semibold">{book.title}</h2>
                <p className="text-sm text-muted-foreground">{chapter.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="border-t bg-card p-4">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm">字體大小：</span>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-32"
                />
                <span className="text-sm">{fontSize}px</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(false)}
              >
                關閉
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Reader Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
        >
          <h1 className="text-3xl font-bold mb-6">{chapter.title}</h1>
          <div className="whitespace-pre-wrap leading-relaxed">
            {chapter.content}
          </div>
          {/* Extended content for demo */}
          <p className="mt-6">
            這是一個充滿懸念的故事，每個轉折都讓人意想不到。主角在這個旅程中遇到了許多挑戰，但也收穫了成長與友誼。
          </p>
          <p className="mt-4">
            當夜幕降臨，城市的燈火開始亮起時，他知道自己必須做出選擇。這個選擇將影響他的一生，也將改變所有人的命運。
          </p>
          <p className="mt-4">
            站在十字路口，他深深地吸了一口氣，然後邁出了堅定的步伐。無論前方等待著什麼，他已經準備好了。
          </p>
        </div>
      </div>

      {/* Reader Footer Navigation */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              disabled={!prevChapter}
              onClick={() => {
                if (prevChapter) {
                  navigate(`/reader/${bookId}/chapter/${prevChapter.id}`);
                }
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              上一章
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/book/${bookId}`)}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              目錄
            </Button>
            <Button
              variant="outline"
              disabled={!nextChapter}
              onClick={() => {
                if (nextChapter) {
                  navigate(`/reader/${bookId}/chapter/${nextChapter.id}`);
                }
              }}
            >
              下一章
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
