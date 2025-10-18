
"use client";
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const uploadSchema = z.object({
  title: z.string().min(1, 'Material title is required.'),
  description: z.string().min(1, 'Description is required.'),
  topic: z.string().min(1, 'Please select a topic.'),
  materialFile: z.any().refine(fileList => fileList.length === 1, 'Material file is required.'),
  thumbnailFile: z.any().optional(),
});

const topics = ["Waste Management", "Renewable Energy", "Ecosystems", "Water Conservation", "Food & Agriculture", "Climate Action"];

export default function LecturerUploadView() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: '',
      description: '',
      topic: '',
    }
  });

  function onSubmit(values: z.infer<typeof uploadSchema>) {
    console.log(values);
    toast({
      title: 'Upload Successful!',
      description: `Material "${values.title}" has been uploaded.`,
    });
    form.reset();
  }

  return (
    <Card className="rounded-2xl shadow-md bg-white/60 backdrop-blur-sm mt-6">
      <CardHeader>
        <CardTitle>Upload New Material</CardTitle>
        <CardDescription>Fill in the details to add a new learning resource.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The Lifecycle of Plastic" {...field} />
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
                    <Textarea placeholder="A brief summary of the material." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                      <FormLabel>Topic / Tag</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select a topic" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                              {topics.map(topic => <SelectItem key={topic} value={topic}>{topic}</SelectItem>)}
                          </SelectContent>
                      </Select>
                      <FormMessage />
                  </FormItem>
                 )}
              />
            <FormField
              control={form.control}
              name="materialFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material File (PDF, Image, etc.)</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={e => field.onChange(e.target.files)} />
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
                  <FormLabel>Thumbnail Image (Optional)</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={e => field.onChange(e.target.files)} />
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full sm:w-auto" size="lg">
              <UploadCloud className="mr-2 h-5 w-5" />
              Upload Material
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
