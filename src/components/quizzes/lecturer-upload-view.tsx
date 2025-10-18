
"use client";
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadCloud, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '../ui/checkbox';

const questionSchema = z.object({
  text: z.string().min(1, 'Question text is required.'),
  type: z.enum(['single', 'multiple', 'truefalse', 'fillblank']),
  options: z.array(z.object({ text: z.string().min(1, 'Option text is required.') })).optional(),
  correctAnswer: z.any(),
});

const uploadSchema = z.object({
  title: z.string().min(1, 'Quiz title is required.'),
  description: z.string().min(1, 'Description is required.'),
  questions: z.array(questionSchema).min(1, 'At least one question is required.'),
});

export default function LecturerUploadView() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: '',
      description: '',
      questions: [{ text: '', type: 'single', options: [{text: ''}, {text: ''}], correctAnswer: '' }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  function onSubmit(values: z.infer<typeof uploadSchema>) {
    console.log(values);
    toast({
      title: 'Upload Successful!',
      description: `Quiz "${values.title}" has been created.`,
    });
    form.reset();
  }

  return (
    <Card className="rounded-2xl shadow-md bg-white/60 backdrop-blur-sm mt-6">
      <CardHeader>
        <CardTitle>Create New Quiz</CardTitle>
        <CardDescription>Fill in the details to build a new quiz for your students.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Fundamentals of Climate Change" {...field} />
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
                    <Textarea placeholder="A brief summary of what this quiz covers." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Questions</FormLabel>
              <div className="space-y-6 mt-2">
                {fields.map((field, index) => (
                  <Card key={field.id} className="p-4 bg-green-50/30">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold">Question {index + 1}</h4>
                      <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}><Trash2 className="h-4 w-4 text-red-500"/></Button>
                    </div>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`questions.${index}.text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Question Text</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`questions.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Question Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="single">Single Correct</SelectItem>
                                <SelectItem value="multiple">Multiple Correct</SelectItem>
                                <SelectItem value="truefalse">True/False</SelectItem>
                                <SelectItem value="fillblank">Fill in the Blank</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Render options based on type */}
                    </div>
                  </Card>
                ))}
                <Button type="button" variant="outline" onClick={() => append({ text: '', type: 'single', options: [{text:''}], correctAnswer:'' })}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full sm:w-auto" size="lg">
              <UploadCloud className="mr-2 h-5 w-5" />
              Create Quiz
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
