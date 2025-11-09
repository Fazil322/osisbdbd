export type View = 'dashboard' | 'transparency' | 'aspirations' | 'media' | 'voting';

export type NavigationItem = {
  id: View;
  label: string;
  icon: string;
};

export interface CountdownEvent {
  title: string;
  date: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  publishedDate: string;
}

export interface PollOption {
  text: string;
  votes: number;
}

export interface Poll {
  id: number;
  question: string;
  options: PollOption[];
}

export interface Aspiration {
  title: string;
  response: string;
}

export interface Event {
  title: string;
  date: string;
  category: 'Akademik' | 'Olahraga' | 'Seni' | 'Lainnya';
}

export interface DashboardData {
  countdownEvent: CountdownEvent;
  news: NewsArticle[];
  poll: Poll;
  answeredAspiration: Aspiration;
  calendarEvents: Event[];
}

export type WorkProgramStatus = 'Planned' | 'In Progress' | 'Completed' | 'Cancelled';

export interface WorkProgram {
  title: string;
  description: string;
  pic: string; // Person in Charge
  status: WorkProgramStatus;
  budgetApproved: number;
  budgetRealized: number;
}

export type AspirationStatus = 'Pending' | 'Reviewed' | 'In Progress' | 'Resolved' | 'Rejected';

export interface AspirationResponse {
    responder: string;
    responseText: string;
}

export interface AspirationPost {
  id: number;
  author: string;
  title: string;
  content: string;
  upvotes: number;
  submittedDate: string;
  status: AspirationStatus;
  response?: AspirationResponse;
}

export type MediaType = 'photo' | 'video';

export interface MediaItem {
    id: number;
    type: MediaType;
    title: string;
    description: string;
    thumbnailUrl: string;
    url: string; // url to full image or video
    author: string;
    date: string;
    likes: number;
    comments: { user: string; text: string }[];
}


export interface VotingCandidate {
    id: number;
    number: number;
    name: string;
    slogan: string;
    photoUrl: string;
    vision: string;
    mission: string[];
}

export interface Election {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    candidates: VotingCandidate[];
}
