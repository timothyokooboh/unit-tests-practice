import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/vue'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import CountriesList from './CountriesList.vue'
import { useListCountries } from '@/composables/useListCountries'
import { countriesApi } from '@/api'
import { nextTick } from 'vue'

const mockedResponse = {
  data: [
    {
      flags: {
        png: 'https://flagcdn.com/w320/va.png',
        svg: 'https://flagcdn.com/va.svg',
        alt: 'The flag of Vatican City is square shaped'
      },
      name: {
        common: 'camera',
        official: 'Vatican City State',
        nativeName: {
          ita: {
            official: 'Stato della Città del Vaticano',
            common: 'Vaticano'
          },
          lat: {
            official: 'Status Civitatis Vaticanæ',
            common: 'Vaticanæ'
          }
        }
      }
    },
    {
      flags: {
        png: 'https://flagcdn.com/w320/cy.png',
        svg: 'https://flagcdn.com/cy.svg',
        alt: 'The flag of Cyprus has a white field, at the center of which is a copper-colored silhouette of the Island of Cyprus above two green olive branches crossed at the stem.'
      },
      name: {
        common: 'Cyprus',
        official: 'Republic of Cyprus',
        nativeName: {
          ell: {
            official: 'Δημοκρατία της Κύπρος',
            common: 'Κύπρος'
          },
          tur: {
            official: 'Kıbrıs Cumhuriyeti',
            common: 'Kıbrıs'
          }
        }
      }
    }
  ]
}

describe('CountriesList', () => {
  beforeEach(() => {
    render(CountriesList)
  })

  describe('before data has loaded', () => {
    it('renders a loading UI', async () => {
      const loader = screen.getByTestId('loader')
      expect(loader).toBeInTheDocument()
      expect(loader).toHaveAttribute('aria-busy', 'true')
    })
  })

  describe('when data has loaded', () => {
    beforeEach(async () => {
      vi.spyOn(countriesApi, 'listAllCountries').mockResolvedValue(mockedResponse as any)
      const { listCountries } = useListCountries()
      await listCountries()
    })

    it('renders a view containing the list of countries', async () => {
      await waitFor(
        async () => {
          const countriesView = await screen.findByTestId('countries')
          expect(countriesView).toBeInTheDocument()
        },
        {
          timeout: 5000
        }
      )
    })

    it('renders the names of countries and their flags', async () => {
      await waitFor(
        async () => {
          const vaticanCity = await screen.findByText('camera')
          const vaticanFlag = await screen.findByAltText(
            'The flag of Vatican City is square shaped'
          )
          expect(vaticanCity).toBeInTheDocument()
          expect(vaticanFlag).toBeInTheDocument()
        },
        { timeout: 5000 }
      )
    })
  })
})
