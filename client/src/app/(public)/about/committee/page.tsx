import { TeamCard } from "@/components/TeamCard"
import { apiUrl } from "@/config/constants"
import SSRLoadMoreData from "@/components/SSRLoadMoreData"
import CommiteeHeader from "@/components/aboutPage/CommiteeHeader"
import { TeamMember } from "@/@types/TeamMemberProps";
interface AboutPageProps {
  searchParams?: Promise<{ limit?: string }>;
}
export default function CommitteePage({ searchParams }: AboutPageProps) {
  return (
    <div>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header Section */}
        <CommiteeHeader />
        {/* Team Grid Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-4xl font-bold mb-5">পরিচালনা পরিষদ</p>
            <SSRLoadMoreData<TeamMember>
              apiUrl={`${apiUrl}/commitee`}
              searchParams={searchParams}
              defaultLimit={20}
              roleType="পরিচালক"
            >
              {(images) => {
                if (!images || images.length === 0) {
                  return (
                    <div className="text-center py-10 text-gray-500">
                      No data available
                    </div>
                  );
                }
                return (
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-3">
                      {images.map((advisor) => (
                        <TeamCard key={advisor.id} member={advisor} />
                      ))}
                    </div>
                  </div>
                );
              }}
            </SSRLoadMoreData>
          </div>
        </section>
      </main>
    </div>
  )
}
