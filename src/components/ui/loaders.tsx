/**
 * Standardized Loader Components
 * 
 * These components provide consistent loading states across the application:
 * 
 * - DetailPageLoader: For individual item detail pages (e.g., quiz details, course details)
 * - ListPageLoader: For list/table pages (e.g., quizzes list, courses list, blog posts)
 * - AnalyticsDashboardLoader: For analytics and dashboard pages with charts and metrics
 * - SimpleLoader: For simple content areas that just need a basic loading state
 * 
 * Usage:
 * - Import the appropriate loader: import { DetailPageLoader } from '@/components/ui/loaders'
 * - Use in your loading state: if (isLoading) return <DetailPageLoader />
 * - Customize with props as needed: <DetailPageLoader backHref="/back" backText="Back" />
 */

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowLeft, Plus } from 'lucide-react'

interface DetailPageLoaderProps {
  title?: string
  subtitle?: string
  backHref?: string
  backText?: string
  actionButtons?: React.ReactNode
}

export function DetailPageLoader({ 
  title = "Loading...", 
  subtitle = "Please wait while we load the details",
  backHref,
  backText = "Back",
  actionButtons
}: DetailPageLoaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-col gap-4 w-full">
          <div className="flex items-start justify-between w-full gap-2">
            {backHref ? (
              <Button variant="outline" size="sm" disabled>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backText}
              </Button>
            ) : (
              <div className="h-9 w-32 bg-muted rounded animate-pulse"></div>
            )}
            <div className="flex items-center justify-end gap-2">
              {actionButtons || (
                <>
                  <div className="h-9 w-24 bg-muted rounded animate-pulse"></div>
                  <div className="h-9 w-20 bg-muted rounded animate-pulse"></div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-2">
            <div className="h-8 w-64 bg-muted rounded animate-pulse" title={title}></div>
            <div className="h-4 w-96 bg-muted rounded animate-pulse" title={subtitle}></div>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
              <div className="h-3 w-32 bg-muted rounded animate-pulse mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

interface ListPageLoaderProps {
  title?: string
  subtitle?: string
  createButtonText?: string
  createHref?: string
}

export function ListPageLoader({ 
  title = "Loading...", 
  subtitle = "Please wait while we load the data",
  createButtonText = "Create",
  createHref
}: ListPageLoaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-64 bg-muted rounded animate-pulse" title={title}></div>
          <div className="h-4 w-96 bg-muted rounded animate-pulse mt-2" title={subtitle}></div>
        </div>
        {createHref ? (
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            {createButtonText}
          </Button>
        ) : (
          <div className="h-9 w-32 bg-muted rounded animate-pulse"></div>
        )}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
              <div className="h-3 w-32 bg-muted rounded animate-pulse mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="h-96 bg-muted rounded animate-pulse"></div>
    </div>
  )
}

interface AnalyticsDashboardLoaderProps {
  title?: string
  subtitle?: string
  backHref?: string
  backText?: string
  actionButtons?: React.ReactNode
}

export function AnalyticsDashboardLoader({ 
  title = "Loading Analytics...", 
  subtitle = "Please wait while we load the analytics data",
  backHref,
  backText = "Back",
  actionButtons
}: AnalyticsDashboardLoaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            {backHref ? (
              <Button variant="outline" size="sm" disabled>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backText}
              </Button>
            ) : (
              <div className="h-9 w-32 bg-muted rounded animate-pulse"></div>
            )}
            {actionButtons || (
              <div className="h-9 w-24 bg-muted rounded animate-pulse"></div>
            )}
          </div>
          <div>
            <div className="h-8 w-64 bg-muted rounded animate-pulse" title={title}></div>
            <div className="h-4 w-48 bg-muted rounded animate-pulse mt-2" title={subtitle}></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
              <div className="h-3 w-32 bg-muted rounded animate-pulse mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="h-5 w-32 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-48 bg-muted rounded animate-pulse mt-2"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="h-2 w-full bg-muted rounded animate-pulse"></div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="h-5 w-40 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-56 bg-muted rounded animate-pulse mt-2"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-6 w-24 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="h-5 w-40 bg-muted rounded animate-pulse"></div>
          <div className="h-4 w-64 bg-muted rounded animate-pulse mt-2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded animate-pulse"></div>
        </CardContent>
      </Card>
    </div>
  )
}

interface SimpleLoaderProps {
  className?: string
}

export function SimpleLoader({ className = "h-96" }: SimpleLoaderProps) {
  return (
    <div className={`${className} bg-muted rounded animate-pulse`}></div>
  )
} 