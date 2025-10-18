
"use client";
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, UploadCloud } from 'lucide-react';
import LecturerExploreView from './lecturer-explore-view';
import LecturerUploadView from './lecturer-upload-view';
import Link from 'next/link';

export default function LecturerVideoLectures() {
  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard?role=lecturer">
                    <ArrowLeft />
                </Link>
            </Button>
            <h1 className="text-3xl font-bold font-headline">Video Lectures Management</h1>
        </div>

        <Tabs defaultValue="explore" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="explore"><Eye className="mr-2 h-4 w-4"/> Explore</TabsTrigger>
                <TabsTrigger value="upload"><UploadCloud className="mr-2 h-4 w-4"/> Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="explore">
                <LecturerExploreView />
            </TabsContent>
            <TabsContent value="upload">
                <LecturerUploadView />
            </TabsContent>
        </Tabs>
    </div>
  );
}
