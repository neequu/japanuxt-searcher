export interface JapaneseWord {
  slug: string
  is_common: boolean
  tags: string[]
  jlpt: string[]
  japanese: { word: string; reading: string }[]
  senses: [
    {
      english_definitions: string[]
      parts_of_speech: string[]
      links: string[]
      tags: string[]
      restrictions: string[]
      see_also: string[]
      antonyms: string[]
      source: []
      info: string[]
    },
  ]
  attribution: {
    jmdict: boolean | string
    jmnedict: boolean | string
    dbpedia: boolean | string
  }
}

export interface Example {
  category_count: {
    anime: number
    drama: number
    games: number
    literature: number
    news: number
  }
  deck_count: {
    anime: {
      [key: string]: number
    }
    drama: {
      [key: string]: number
    }
    games: {
      [key: string]: number
    }
    literature: {
      [key: string]: number
    }
    news: {
      [key: string]: number
    }
  }
  dictionary: [
    [
      {
        glossary_list: string[]
        headword: string
        reading: string
        sound: string
        tags: string
      },
    ],
  ]
  exact_match: string
  examples: {
    author_japanese: string
    category: 'anime' | 'news' | 'drama' | 'games' | 'literature'
    channel: string
    deck_id: number
    deck_name: string
    deck_name_japanese: string
    episode: number | ''
    id: number
    image_url: string
    position: number
    sentence: string
    sentence_id: string
    sentence_with_furigana: string
    sound_begin: string
    sound_end: string
    sound_url: string
    tags: string[]
    timestamp: string
    translation: string
    translation_word_index: number[]
    translation_word_list: string[]
    word_index: number[]
    word_list: string[]
  }[]
}
