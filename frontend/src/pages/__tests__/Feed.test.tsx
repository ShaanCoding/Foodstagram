import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Feed from '../Feed'

const queryClient = new QueryClient()

it('The Feed page renders correctly', () => {
	const tree = renderer
		.create(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Feed />
				</BrowserRouter>
			</QueryClientProvider>
		)
		.toJSON()
	expect(tree).toMatchSnapshot()
})
