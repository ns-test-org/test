'use client';

import { useState, useMemo } from 'react';
import { emojiData } from '../data/emojis';
import EmojiGrid from './EmojiGrid';
import SearchBar from './SearchBar';
import CategoryTabs from './CategoryTabs';
import CopiedNotification from './CopiedNotification';

export default function EmojiPicker() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);

  const filteredEmojis = useMemo(() => {
    let emojis = emojiData;

    // Filter by category
    if (selectedCategory !== 'all') {
      emojis = emojis.filter(emoji => emoji.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      emojis = emojis.filter(emoji => 
        emoji.name.toLowerCase().includes(query) ||
        emoji.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    return emojis;
  }, [selectedCategory, searchQuery]);

  const handleEmojiClick = async (emoji: string) => {
    try {
      await navigator.clipboard.writeText(emoji);
      setCopiedEmoji(emoji);
      setTimeout(() => setCopiedEmoji(null), 2000);
    } catch (err) {
      console.error('Failed to copy emoji:', err);
    }
  };

  const categories = [
    { id: 'all', name: 'All', icon: '🌟' },
    { id: 'smileys', name: 'Smileys', icon: '😀' },
    { id: 'people', name: 'People', icon: '👥' },
    { id: 'animals', name: 'Animals', icon: '🐶' },
    { id: 'food', name: 'Food', icon: '🍕' },
    { id: 'travel', name: 'Travel', icon: '✈️' },
    { id: 'activities', name: 'Activities', icon: '⚽' },
    { id: 'objects', name: 'Objects', icon: '💡' },
    { id: 'symbols', name: 'Symbols', icon: '❤️' },
    { id: 'flags', name: 'Flags', icon: '🏳️' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <SearchBar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
          />
        </div>

        {/* Category Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Emoji Grid */}
        <div className="p-6">
          <EmojiGrid
            emojis={filteredEmojis}
            onEmojiClick={handleEmojiClick}
          />
          
          {filteredEmojis.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No emojis found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or selecting a different category
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Copied Notification */}
      <CopiedNotification emoji={copiedEmoji} />
    </div>
  );
}
