"use client";

import { useState, useEffect, useCallback } from "react";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

const PAGE_SIZE = 24;

export function GalleryPageClient() {
  const [stats, setStats] = useState<{ totalPhotos: number; totalCategories: number } | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [images, setImages] = useState<Array<{
    id: string;
    url: string;
    title: string | null;
    alt: string | null;
    category: string | null;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const loadStats = useCallback(async () => {
    try {
      const [imagesRes, categoriesRes] = await Promise.all([
        fetch("/api/public/images?page=1&limit=1"),
        fetch("/api/public/categories?type=IMAGE"),
      ]);
      const imagesData = await imagesRes.json();
      const categoriesData = await categoriesRes.json();
      const totalPhotos = imagesData.success && imagesData.pagination
        ? imagesData.pagination.total ?? 0
        : 0;
      const totalCategories = categoriesData.success && Array.isArray(categoriesData.categories)
        ? categoriesData.categories.length
        : 0;
      setStats({ totalPhotos, totalCategories });
    } catch {
      setStats({ totalPhotos: 0, totalCategories: 0 });
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const loadImages = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/public/images?page=${pageNum}&limit=${PAGE_SIZE}`
      );
      const data = await res.json();
      if (data.success) {
        setImages(data.images || []);
        const pag = data.pagination;
        if (pag) {
          setTotalPages(pag.pages ?? 1);
          setTotal(pag.total ?? 0);
        }
      }
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    loadImages(page);
  }, [page, loadImages]);

  return (
    <>
      <GalleryHero
        totalPhotos={stats?.totalPhotos}
        totalCategories={stats?.totalCategories}
        statsLoading={statsLoading}
      />
      <div className="container-elegant py-16">
        <GalleryGrid
          images={images}
          loading={loading}
          page={page}
          totalPages={totalPages}
          total={total}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
