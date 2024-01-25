import "./globals.css";
export const metadata = {
  title:
    "DailyDoer.Com - Daily Task Organizer For Proactive Individuals Seeking Seamless Productivity.",
  description:
    "Daily Task Organizer For Proactive Individuals Seeking Seamless Productivity.",
};
import Wrapper from "@/components/wrapper/Wrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
