import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Search from '../Search'

const queryClient = new QueryClient()

it('The Search page renders correctly', () => {
	const tree = renderer
		.create(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Search />
				</BrowserRouter>
			</QueryClientProvider>
		)
		.toJSON()
	expect(tree).toMatchSnapshot()
})
