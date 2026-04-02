import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/footer"
import Providers from "./providers";

export const revalidate = 60;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
<html lang="en" suppressHydrationWarning>
  <body className="min-h-screen flex flex-col bg-[var(--bg-light)] dark:bg-[var(--background)] transition-colors duration-300">
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <main className="flex-1">
        <Providers>
          {children}
        </Providers>
      </main>
  <Footer/>
    </ThemeProvider>
  </body>
</html>
  )
}

