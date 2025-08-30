"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
}

const presetColors = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981',
  '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
  '#d946ef', '#ec4899', '#f43f5e', '#6b7280', '#374151', '#1f2937'
]

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value)

  const handleColorSelect = (color: string) => {
    onChange(color)
    setInputValue(color)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setInputValue(color)
    if (color.match(/^#[0-9A-F]{6}$/i)) {
      onChange(color)
    }
  }

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-12 h-10 p-0 border-2"
              style={{ backgroundColor: value }}
            >
              <span className="sr-only">Pick a color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="grid grid-cols-10 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded border-2 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                    title={color}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={value}
                  onChange={(e) => handleColorSelect(e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <div className="text-sm text-muted-foreground">
          {value}
        </div>
      </div>
    </div>
  )
} 