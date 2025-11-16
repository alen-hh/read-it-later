import { BookmarkIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"

import "./style.css"

// Type for a read-it-later item
interface ReadItLaterItem {
  id: string
  title: string
  url: string
  createdAt: number
}

// Generate a simple unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Get page metadata
async function getCurrentPageInfo(): Promise<
  Omit<ReadItLaterItem, "id" | "createdAt">
> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  return {
    title: tab.title || "Untitled",
    url: tab.url || ""
  }
}

function IndexSidePanel() {
  const [items, setItems] = useState<ReadItLaterItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load items from storage on mount
  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      const result = await chrome.storage.local.get("readItLaterItems")
      const savedItems = result.readItLaterItems || []
      setItems(savedItems)
    } catch (error) {
      console.error("Error loading items:", error)
    }
  }

  const saveItems = async (newItems: ReadItLaterItem[]) => {
    try {
      await chrome.storage.local.set({ readItLaterItems: newItems })
      setItems(newItems)
    } catch (error) {
      console.error("Error saving items:", error)
    }
  }

  const handleAddPage = async () => {
    setIsLoading(true)
    try {
      // Check if list has reached the maximum limit
      if (items.length >= 100) {
        alert("You have reached the maximum limit of 100 items. Please remove some items before adding more.")
        setIsLoading(false)
        return
      }

      const pageInfo = await getCurrentPageInfo()

      // Check if URL already exists
      const exists = items.some((item) => item.url === pageInfo.url)
      if (exists) {
        alert("This page is already in your read-it-later list!")
        setIsLoading(false)
        return
      }

      const newItem: ReadItLaterItem = {
        id: generateId(),
        ...pageInfo,
        createdAt: Date.now()
      }

      const updatedItems = [newItem, ...items]
      await saveItems(updatedItems)
    } catch (error) {
      console.error("Error adding page:", error)
      alert("Failed to add page. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveItem = async (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id)
    await saveItems(updatedItems)
  }

  const handleOpenLink = (url: string) => {
    chrome.tabs.create({ url })
  }

  return (
    <div className="plasmo-flex plasmo-flex-col plasmo-h-screen plasmo-bg-gray-50">
      {/* Header */}
      <div className="plasmo-bg-white plasmo-border-b plasmo-border-gray-200 plasmo-p-4 plasmo-shadow-sm">
        <h1 className="plasmo-text-2xl plasmo-font-bold plasmo-text-gray-800 plasmo-mb-3">
          Read It Later
        </h1>
        <button
          onClick={handleAddPage}
          disabled={isLoading}
          className="plasmo-w-full plasmo-bg-blue-600 hover:plasmo-bg-blue-700 disabled:plasmo-bg-blue-400 plasmo-text-white plasmo-font-medium plasmo-py-2.5 plasmo-px-4 plasmo-rounded-lg plasmo-flex plasmo-items-center plasmo-justify-center plasmo-gap-2 plasmo-transition-colors">
          <BookmarkIcon className="plasmo-w-5 plasmo-h-5" />
          {isLoading ? "Adding..." : "Add Current Page"}
        </button>
      </div>

      {/* List */}
      <div className="plasmo-flex-1 plasmo-overflow-y-auto plasmo-p-4">
        {items.length === 0 ? (
          <div className="plasmo-text-center plasmo-py-12 plasmo-text-gray-500">
            <BookmarkIcon className="plasmo-w-16 plasmo-h-16 plasmo-mx-auto plasmo-mb-3 plasmo-text-gray-300" />
            <p className="plasmo-text-lg plasmo-font-medium">
              No saved pages yet
            </p>
            <p className="plasmo-text-sm plasmo-mt-1">
              Click "Add Current Page" to get started
            </p>
          </div>
        ) : (
          <div className="plasmo-space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="plasmo-bg-white plasmo-border plasmo-border-gray-200 plasmo-rounded-lg plasmo-p-4 plasmo-shadow-sm hover:plasmo-shadow-md plasmo-transition-shadow">
                <div className="plasmo-flex plasmo-justify-between plasmo-items-start plasmo-gap-3">
                  <div className="plasmo-flex-1 plasmo-min-w-0">
                    <h3
                      className="plasmo-font-semibold plasmo-text-gray-900 plasmo-mb-1 plasmo-text-pretty plasmo-cursor-pointer hover:plasmo-text-blue-600"
                      title={item.title}
                      onClick={() => handleOpenLink(item.url)}>
                      {item.title}
                    </h3>
                    <p className="plasmo-text-xs plasmo-text-gray-400 plasmo-mt-2 plasmo-text-pretty">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="plasmo-text-gray-400 hover:plasmo-text-red-600 plasmo-transition-colors plasmo-flex-shrink-0 hover:plasmo-bg-red-50 plasmo-p-1 plasmo-rounded-md"
                    title="Remove">
                    <TrashIcon className="plasmo-w-5 plasmo-h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default IndexSidePanel
