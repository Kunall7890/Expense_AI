
import React, { useState } from "react";
import { Briefcase, FileUp, CheckCircle, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { analyzeResume } from "@/utils/resumeAnalysis";

interface ResumeFormValues {
  jobDescription: string;
  resumeText: string;
}

interface MatchResult {
  score: number;
  keywordMatches: { keyword: string; found: boolean }[];
  suggestions: string[];
}

const ATS = () => {
  const { toast } = useToast();
  const [result, setResult] = useState<MatchResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const form = useForm<ResumeFormValues>({
    defaultValues: {
      jobDescription: "",
      resumeText: "",
    },
  });

  const onSubmit = async (data: ResumeFormValues) => {
    if (!data.jobDescription.trim() || !data.resumeText.trim()) {
      toast({
        title: "Error",
        description: "Please provide both a job description and resume text",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate analysis with a delay (in a real app, this would call an API)
      setTimeout(() => {
        const result = analyzeResume(data.resumeText, data.jobDescription);
        setResult(result);
        setIsAnalyzing(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the resume. Please try again.",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center">
          <Briefcase className="mr-2" />
          <h1 className="text-xl font-semibold">Resume ATS Scanner</h1>
          <span className="ml-2 text-xs bg-secondary px-2 py-0.5 rounded-full">
            AI-Powered Analysis
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-medium mb-4">Input Your Data</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Paste the job description here..." 
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="resumeText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resume Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Paste your resume text here..." 
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center">
                        <span className="mr-2 animate-spin">⌛</span>
                        Analyzing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FileUp className="mr-2 h-4 w-4" />
                        Analyze Resume
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start gap-3 mb-3">
                <Info className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-medium">Tips for Success</h2>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Customize your resume for each job application</li>
                <li>• Include relevant keywords from the job description</li>
                <li>• Use industry-standard terminology</li>
                <li>• Highlight achievements with quantifiable results</li>
                <li>• Ensure proper formatting without tables or complex layouts</li>
              </ul>
            </div>
          </div>
          
          {/* Results Section */}
          <div className="space-y-6">
            {result ? (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-medium mb-4">Analysis Results</h2>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Match Score</span>
                    <span className="text-sm font-medium">{result.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        result.score > 70 
                          ? 'bg-green-500' 
                          : result.score > 40 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                      }`} 
                      style={{ width: `${result.score}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {result.score > 70 
                      ? 'Great match! Your resume aligns well with this job.' 
                      : result.score > 40 
                        ? 'Moderate match. Consider the suggestions below.' 
                        : 'Low match. Your resume needs significant improvements for this job.'}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3">Keyword Matches</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {result.keywordMatches.map((match, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center p-2 rounded-md ${
                          match.found ? 'bg-green-50' : 'bg-red-50'
                        }`}
                      >
                        {match.found ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        )}
                        <span className="text-sm">{match.keyword}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {result.suggestions.length > 0 && (
                  <div>
                    <h3 className="text-md font-medium mb-3">Suggestions for Improvement</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {result.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex">
                          <span className="mr-2">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm border h-full flex flex-col items-center justify-center text-center">
                <FileUp className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700">No Results Yet</h3>
                <p className="text-gray-500 mt-2">
                  Submit your resume and job description for AI-powered analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 px-6 border-t">
        <div className="container mx-auto text-center text-sm text-gray-500">
          Resume ATS Scanner - Improve your job application success rate
        </div>
      </footer>
    </div>
  );
};

export default ATS;
