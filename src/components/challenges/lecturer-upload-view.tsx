
"use client";
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadCloud, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const uploadSchema = z.object({
  title: z.string().min(1, 'Challenge title is required.'),
  description: z.string().min(1, 'Description is required.'),
  xp: z.coerce.number().min(1, 'XP reward is required.'),
});

export default function LecturerUploadView() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: '',
      description: '',
      xp: 50,
    }
  });

  function onSubmit(values: z.infer<typeof uploadSchema>) {
    console.log(values);
    toast({
      title: 'Upload Successful!',
      description: `Challenge "${values.title}" has been created.`,
    });
    form.reset();
  }

  return (
    <Card className="rounded-2xl shadow-md bg-white/60 backdrop-blur-sm mt-6">
      <CardHeader>
        <CardTitle>Create New Daily Challenge</CardTitle>
        <CardDescription>Fill in the details to create a new challenge for your students.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Meatless Monday" {...field} />
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
                    <Textarea placeholder="A brief summary of the challenge." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="xp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>XP Reward</FormLabel>
                  <div className="relative">
                     <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-yellow-500" />
                    <FormControl>
                      <Input type="number" placeholder="50" {...field} className="pl-10" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full sm:w-auto" size="lg">
              <UploadCloud className="mr-2 h-5 w-5" />
              Create Challenge
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
