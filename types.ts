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
    jmdict: boolean
    jmnedict: boolean
    dbpedia: boolean
  }
}
