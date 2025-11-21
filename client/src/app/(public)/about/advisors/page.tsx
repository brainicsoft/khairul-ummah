import { TeamMember } from "@/@types/TeamMemberProps";
import AdvisorHeader from "@/components/aboutPage/AdvisorHeader";
import SSRLoadMoreData from "@/components/SSRLoadMoreData";
import { TeamCard } from "@/components/TeamCard"
import { apiUrl } from "@/config/constants";
interface AboutPageProps {
  searchParams?: Promise<{ limit?: string }>;
}
export default function AdvisorsPage({ searchParams }: AboutPageProps) {
  return (
    <div>
      <main className="min-h-screen ">
        {/*AdvisorsPage Header Section */}
        <AdvisorHeader/> 
        <SSRLoadMoreData<TeamMember>
          apiUrl={`${apiUrl}/commitee`}
          searchParams={searchParams}
          defaultLimit={20}
          roleType="উপদেষ্টা"
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
      </main>
    </div>
  )
}
