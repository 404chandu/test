
"use client";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const uploadSchema = z.object({
  title: z.string().min(1, 'Video title is required.'),
  description: z.string().min(1, 'Description is required.'),
  videoFile: z.any().refine(fileList => fileList.length === 1, 'Video file is required.'),
  thumbnailFile: z.any().refine(fileList => fileList.length === 1, 'Thumbnail image is required.'),
});

export default function LecturerUploadView() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: '',
      description: '',
    }
  });

  function onSubmit(values: z.infer<typeof uploadSchema>) {
    console.log(values);
    toast({
      title: 'Upload Successful!',
      description: `"${values.title}" has been uploaded and is now available for students.`,
    });
    form.reset();
  }

  return (
    <Card className="rounded-2xl shadow-md bg-white/60 backdrop-blur-sm mt-6">
      <CardHeader>
        <CardTitle>Upload New Video Lecture</CardTitle>
        <CardDescription>Fill in the details below to add a new video for your students.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The Future of Renewable Energy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A brief summary of what students will learn in this video." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video File</FormLabel>
                  <FormControl>
                    <Input type="file" accept="video/*" onChange={e => field.onChange(e.target.files)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="thumbnailFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail Image</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={e => field.onChange(e.target.files)} />
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full sm:w-auto" size="lg">
              <UploadCloud className="mr-2 h-5 w-5" />
              Upload Video
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
