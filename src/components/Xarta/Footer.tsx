import { cn } from '@/lib/utils';
import './footer.css';
import { mainFlexContainer } from './Home/mainFlexContainer';

export const Footer = () => {

    return <footer id="FOOTER_1" className="text-[rgb(248,249,250)] w-full mt-24 pt-12 pb-0 px-0 bg-[rgb(33,37,41)]">
	<div id="DIV_2" className={cn(mainFlexContainer)}>
		<div id="DIV_3" className="flex -mx-3 my-0">

			<div id="DIV_4" className=" px-3 py-0">
				<h6 id="H6_5" className="tracking-[-0.32px] mt-0 mb-2 mx-0">
					Desenvolvimento
				</h6>
                <img className="h-[60px] max-w-[200px] object-contain align-middle w-[200px]" src="https://nucleo.jor.br/content/images/2024/06/logo_claro.png" alt="Um mini CMS para manter seu conteúdo sempre atualizado" width="200px" />
				<p className="max-w-[800px] mt-0 mb-4 mx-0">
					Xarta é um projeto desenvolvido pelo Núcleo Jornalismo e distribuído sob a licença MIT de software aberto. <a href="https://xarta.dev/licenca" className="text-white" id="A_8">Saiba mais aqui</a> sobre a licença de distribuição.
				</p>
			</div>

			<div id="DIV_9" className=" px-3 py-0">
				<div id="DIV_10" className="flex -mx-3 my-0;">

					<div id="DIV_11" className=" px-3 py-0">
						<h6 id="H6_12" className="tracking-[-0.32px] mt-0 mb-2 mx-0">
							Sob o programa
						</h6><img className="h-[42.2188px] align-middle mt-0 mb-4 mx-0" src="https://codesinfo.com.br/wp-content/uploads/2022/05/logo-white-1.png" alt="Codesinfo logo" id="IMG_13" />
					</div>
					<div id="DIV_14" className=" px-3 py-0">
						<h6 id="H6_15" className="tracking-[-0.32px] mt-0 mb-2 mx-0">
							Realização
						</h6><img className="h-[51.875px] align-middle mt-0 mb-4 mx-0" src="https://codesinfo.com.br/wp-content/uploads/2022/05/logo-white-projor-1.png" alt="Projor Logo" width="120px" />
					</div>
					<div id="DIV_17" className=" px-3 py-0">
						<h6 id="H6_18" className="tracking-[-0.32px] mt-0 mb-2 mx-0">
							Apoio
						</h6><img className="h-[26.9141px] align-middle mt-0 mb-4 mx-0" src="https://codesinfo.com.br/wp-content/uploads/2022/05/Google-3.png" alt="Google News Initiative Logo" />
					</div>
				</div>
			</div>
		</div>

		<div id="DIV_20" className="flex text-center mt-6 mb-0 -mx-3">
			<div id="DIV_21" className="flex-[1_0_0%] px-3 py-0">
				<p id="P_22" className="text-center mt-0 mb-4 mx-0">
					Um projeto do <a className="text-white text-center border-0 border-none border-white" href="https://nucleo.jor.br/" id="A_23">Núcleo Jornalismo</a> 2024 • Feito com <a className="text-white text-center border-0 border-none border-white" href="https://ghost.org/" id="A_24">Ghost</a> e <a className="text-white text-center border-0 border-none border-white" href="https://nextjs.org/" id="A_25">Next.js</a>
				</p>
			</div>
		</div>
	</div>

	
</footer>

}