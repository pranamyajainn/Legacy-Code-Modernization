import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Sidebar from '../components/Sidebar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
    title: 'Modernization Console',
    description: 'Enterprise Deterministic Migration',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark h-full">
            <body className={`${inter.variable} ${mono.variable} font-sans h-full overflow-hidden bg-app text-text-primary`}>
                <div className="flex h-full">
                    {/* Fixed Left Navigation Rail */}
                    <Sidebar />

                    {/* Main Content Area */}
                    <main className="flex-1 flex flex-col min-w-0 bg-app relative">
                        {/* Optional Top Bar if needed, otherwise content fills */}
                        {/* Content is scrollable within specific panels, but main is overflow-hidden for 'App' feel */}
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
