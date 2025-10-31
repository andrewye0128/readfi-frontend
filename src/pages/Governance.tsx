import { useState } from "react";
import {
  Vote,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/lib/toast";

const activeProposals = [
  {
    id: 1,
    title: "上架《駭客與畫家》到 ReadFi 平台",
    description:
      "提議將 Paul Graham 的經典著作《駭客與畫家》加入平台書庫，預計版稅設定為 10%。",
    proposer: "0x5a9c...7d2f",
    votingPower: 15000,
    votesFor: 12500,
    votesAgainst: 3200,
    totalVotes: 15700,
    quorum: 10000,
    endTime: "2 天後",
    status: "active",
    category: "新書上架",
  },
  {
    id: 2,
    title: "調整閱讀挖礦獎勵比例",
    description:
      "建議將閱讀挖礦的獎勵率從每分鐘 0.5 READ 提升至 0.6 READ，以激勵更多用戶閱讀。",
    proposer: "0x8f3b...4a1c",
    votingPower: 22000,
    votesFor: 8900,
    votesAgainst: 11200,
    totalVotes: 20100,
    quorum: 15000,
    endTime: "5 天後",
    status: "active",
    category: "獎勵調整",
  },
  {
    id: 3,
    title: "啟用社群書評獎勵機制",
    description:
      "提議對發表高質量書評的用戶給予 READ 代幣獎勵，優質書評可獲得 10-50 READ。",
    proposer: "0x2d7e...9b5a",
    votingPower: 18000,
    votesFor: 14800,
    votesAgainst: 2100,
    totalVotes: 16900,
    quorum: 12000,
    endTime: "1 天後",
    status: "active",
    category: "功能提案",
  },
];

const completedProposals = [
  {
    id: 4,
    title: "降低二手書市場交易手續費",
    votesFor: 25600,
    votesAgainst: 4200,
    totalVotes: 29800,
    status: "passed",
    endTime: "3 天前",
    category: "費用調整",
  },
  {
    id: 5,
    title: "增加質押層級到鉑金會員",
    votesFor: 8900,
    votesAgainst: 15600,
    totalVotes: 24500,
    status: "rejected",
    endTime: "1 週前",
    category: "會員制度",
  },
  {
    id: 6,
    title: "支援 EPUB3 格式電子書",
    votesFor: 19200,
    votesAgainst: 3800,
    totalVotes: 23000,
    status: "passed",
    endTime: "2 週前",
    category: "技術升級",
  },
];

export default function Governance() {
  const [votedProposals, setVotedProposals] = useState<Set<number>>(new Set());
  const myVotingPower = 8500;

  const handleVote = (proposalId: number, support: boolean) => {
    if (votedProposals.has(proposalId)) {
      toast.error("您已經對此提案投過票了");
      return;
    }

    setVotedProposals(new Set([...votedProposals, proposalId]));
    toast.success(
      `已投${support ? "贊成" : "反對"}票，使用了 ${myVotingPower} 投票權`
    );
  };

  const handleCreateProposal = () => {
    toast.info("創建提案需要質押至少 5,000 READ 代幣");
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white border border-border rounded-2xl p-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Vote className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              社群治理
            </span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            DAO 投票系統
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            使用您的 READ 代幣參與平台決策，共同打造更好的閱讀生態
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary rounded-xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-foreground" strokeWidth={2} />
                <span className="text-sm text-muted-foreground">
                  我的投票權
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">
                {myVotingPower.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                基於質押的 READ 代幣
              </p>
            </div>

            <div className="bg-secondary rounded-xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Vote className="w-5 h-5 text-foreground" strokeWidth={2} />
                <span className="text-sm text-muted-foreground">
                  進行中提案
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">
                {activeProposals.length}
              </p>
              <p className="text-xs text-muted-foreground">等待您的投票</p>
            </div>

            <div className="bg-secondary rounded-xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2
                  className="w-5 h-5 text-foreground"
                  strokeWidth={2}
                />
                <span className="text-sm text-muted-foreground">
                  已通過提案
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">
                {completedProposals.filter((p) => p.status === "passed").length}
              </p>
              <p className="text-xs text-muted-foreground">社群共識決策</p>
            </div>
          </div>
        </div>

        {/* Create Proposal Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleCreateProposal}
            className="bg-black hover:bg-black/90 text-white gap-2"
          >
            <Vote className="w-4 h-4" strokeWidth={2} />
            創建新提案
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active" className="gap-2">
              <TrendingUp className="w-4 h-4" strokeWidth={2} />
              進行中
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
              已結束
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeProposals.map((proposal) => {
              const forPercentage =
                (proposal.votesFor / proposal.totalVotes) * 100;
              const againstPercentage =
                (proposal.votesAgainst / proposal.totalVotes) * 100;
              const quorumReached = proposal.totalVotes >= proposal.quorum;
              const hasVoted = votedProposals.has(proposal.id);

              return (
                <div
                  key={proposal.id}
                  className="bg-white border border-border rounded-xl p-6 hover:border-foreground/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-secondary text-foreground border-border">
                          {proposal.category}
                        </Badge>
                        {hasVoted && (
                          <Badge className="bg-black text-white border-0">
                            已投票
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {proposal.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {proposal.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-secondary rounded-lg p-4 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          贊成
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {forPercentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={forPercentage}
                        className="h-2 bg-border"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        {proposal.votesFor.toLocaleString()} 票
                      </p>
                    </div>

                    <div className="bg-secondary rounded-lg p-4 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          反對
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {againstPercentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={againstPercentage}
                        className="h-2 bg-border"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        {proposal.votesAgainst.toLocaleString()} 票
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" strokeWidth={2} />
                        {proposal.endTime}結束
                      </span>
                      <span>
                        提案人：
                        <code className="bg-secondary px-2 py-0.5 rounded text-xs font-mono border border-border text-foreground">
                          {proposal.proposer}
                        </code>
                      </span>
                      {quorumReached && (
                        <Badge className="bg-black text-white border-0 text-xs">
                          已達門檻
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVote(proposal.id, false)}
                        disabled={hasVoted}
                        className="gap-1.5"
                      >
                        <XCircle className="w-4 h-4" strokeWidth={2} />
                        反對
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleVote(proposal.id, true)}
                        disabled={hasVoted}
                        className="bg-black hover:bg-black/90 text-white gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
                        贊成
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedProposals.map((proposal) => {
              const forPercentage =
                (proposal.votesFor / proposal.totalVotes) * 100;
              const isPassed = proposal.status === "passed";

              return (
                <div
                  key={proposal.id}
                  className="bg-white border border-border rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-secondary text-foreground border-border">
                          {proposal.category}
                        </Badge>
                        <Badge
                          className={
                            isPassed
                              ? "bg-black text-white border-0"
                              : "bg-secondary text-muted-foreground border-border"
                          }
                        >
                          {isPassed ? (
                            <>
                              <CheckCircle2
                                className="w-3 h-3 mr-1"
                                strokeWidth={2}
                              />
                              已通過
                            </>
                          ) : (
                            <>
                              <XCircle
                                className="w-3 h-3 mr-1"
                                strokeWidth={2}
                              />
                              未通過
                            </>
                          )}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-foreground">
                        {proposal.title}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-secondary rounded-lg p-4 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          贊成
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {forPercentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={forPercentage}
                        className="h-2 bg-border"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        {proposal.votesFor.toLocaleString()} 票
                      </p>
                    </div>

                    <div className="bg-secondary rounded-lg p-4 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          反對
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {(100 - forPercentage).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={100 - forPercentage}
                        className="h-2 bg-border"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        {proposal.votesAgainst.toLocaleString()} 票
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" strokeWidth={2} />
                      {proposal.endTime}結束
                    </span>
                    <span>
                      總投票數：{proposal.totalVotes.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
