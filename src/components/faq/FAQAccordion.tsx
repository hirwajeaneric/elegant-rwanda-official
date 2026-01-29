"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQCategory {
  id: string;
  name: string;
  slug: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  categoryId: string | null;
  category: FAQCategory | null;
  order: number;
  active: boolean;
}

export function FAQAccordion() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const response = await fetch("/api/public/faqs");
        const data = await response.json();
        if (data.success && Array.isArray(data.faqs)) {
          setFaqs(data.faqs);
        } else {
          setError("Failed to load FAQs");
        }
      } catch {
        setError("Failed to load FAQs");
      } finally {
        setLoading(false);
      }
    }
    fetchFAQs();
  }, []);

  // Group FAQs by category name
  const faqDataByCategory = useMemo(() => {
    const grouped: Record<string, FAQItem[]> = {};
    for (const faq of faqs) {
      const categoryName = faq.category?.name ?? "Uncategorized";
      if (!grouped[categoryName]) grouped[categoryName] = [];
      grouped[categoryName].push(faq);
    }
    // Sort FAQs within each category by order
    for (const name of Object.keys(grouped)) {
      grouped[name].sort((a, b) => a.order - b.order);
    }
    return grouped;
  }, [faqs]);

  const categories = useMemo(() => Object.keys(faqDataByCategory).sort(), [faqDataByCategory]);

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    const result: Record<string, FAQItem[]> = {};
    for (const [category, questions] of Object.entries(faqDataByCategory)) {
      if (activeCategory !== "all" && category !== activeCategory) continue;
      const filtered = questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) result[category] = filtered;
    }
    return result;
  }, [faqDataByCategory, activeCategory, searchQuery]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-16">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Loading FAQs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <p className="text-destructive mb-4">{error}</p>
        <p className="text-sm text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search and Filter */}
      <div className="mb-12 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-primary text-white shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-8">
        {Object.entries(filteredFAQs).map(([category, questions]) => (
          <div key={category}>
            <h2 className="text-2xl font-display font-semibold mb-6 text-center">
              {category}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {questions.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left text-lg hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    <div
                      className="prose prose-sm max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {/* No Results */}
      {Object.keys(filteredFAQs).length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-display font-semibold mb-2">No questions found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search terms or browse all categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
