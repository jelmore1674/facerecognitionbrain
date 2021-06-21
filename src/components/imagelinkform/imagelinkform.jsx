import React from 'react';
import './imagelinkform.css';

function ImageLinkForm() {
	return (
		<div>
			<p className='f3'>
				{
					'This app will detect the faces from your images. Give it a try!'
				}
			</p>
			<div className='center'>
				<div className='center form pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' />
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer'>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;
