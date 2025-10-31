import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="space-y-6">
          <div>
            <h1 className="text-9xl font-bold text-primary">404</h1>
            <h2 className="text-3xl font-semibold mt-4">頁面未找到</h2>
            <p className="text-muted-foreground mt-2">
              抱歉，您訪問的頁面不存在
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button>
                <Home className="h-4 w-4 mr-2" />
                返回首頁
              </Button>
            </Link>
            <Link to="/bookshelf">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                查看書架
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
