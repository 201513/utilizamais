import { ToolItem } from '../types';

export const TOOLS_DATA: ToolItem[] = [
  {
    id: 'tool-cpf-cnpj',
    slug: 'gerador-validador-cpf-cnpj',
    title: 'Gerador e Validador de CPF / CNPJ',
    shortDesc: 'Gere e valide números de CPF e CNPJ válidos para testes de software com pontuação opcional e detecção de região fiscal.',
    longDesc: 'Ferramenta profissional essencial para desenvolvedores, analistas de QA e estudantes que precisam gerar e validar números de Cadastro de Pessoas Físicas (CPF) e Cadastro Nacional da Pessoa Jurídica (CNPJ) para testes de sistemas em conformidade com as regras da Receita Federal do Brasil.',
    category: 'documentos',
    iconName: 'ShieldCheck',
    tags: ['CPF', 'CNPJ', 'Validador', 'Gerador', 'QA', 'Receita Federal', 'Testes'],
    schemaType: 'WebApplication',
    usageCount: 14850,
    featured: true,
    seoTips: [
      'Utilize apenas para fins de desenvolvimento, homologação e testes de software.',
      'Validação matemática precisa baseada no algoritmo oficial de módulo 11.',
      'Detecção automática da região fiscal de emissão pelo 9º dígito do CPF.'
    ],
    faq: [
      {
        question: 'Os números gerados são reais ou pertencem a pessoas?',
        answer: 'Não. Os números gerados por este sistema são criados de forma puramente algorítmica obedecendo às fórmulas matemáticas dos dígitos verificadores estabelecidas pela Receita Federal, servindo exclusivamente para testes em ambientes de desenvolvimento.'
      },
      {
        question: 'Como funciona a validação pelo algoritmo de módulo 11?',
        answer: 'O algoritmo multiplica os primeiros dígitos por pesos decrescentes, calcula o resto da divisão por 11 e determina o primeiro e segundo dígitos verificadores exatos.'
      },
      {
        question: 'Posso usar esta ferramenta offline?',
        answer: 'Sim! Graças ao cache inteligente do UTILIZA +, toda a lógica roda no seu próprio navegador de forma instantânea sem enviar dados para servidores externos.'
      }
    ]
  },
  {
    id: 'tool-contador-texto',
    slug: 'contador-caracteres-seo',
    title: 'Contador de Caracteres, Palavras & Análise SEO',
    shortDesc: 'Conte caracteres, palavras, tempo de leitura e verifique limites exatos para Google Title, Meta Description e Redes Sociais.',
    longDesc: 'Otimize seus conteúdos para o algoritmo do Google com este contador de caracteres e palavras avançado. Inclui análise de densidade de palavras-chave, estimativa de tempo de leitura e escuta, e réguas visuais de limites para snippets de SEO e mídias sociais.',
    category: 'texto-seo',
    iconName: 'FileText',
    tags: ['Contador', 'SEO', 'Meta Description', 'Google Snippet', 'Densidade', 'Copywriting'],
    schemaType: 'WebApplication',
    usageCount: 9320,
    featured: true,
    seoTips: [
      'Mantenha o título SEO (Title Tag) entre 50 e 60 caracteres para evitar truncamento no Google.',
      'A Meta Description ideal possui entre 140 e 155 caracteres com chamada para ação clara.',
      'A densidade ideal da palavra-chave primária costuma variar entre 1% e 2.5% do texto.'
    ],
    faq: [
      {
        question: 'Quantos caracteres o Google exibe no resultado de busca?',
        answer: 'Geralmente o Google exibe cerca de 600 pixels de largura para o título (aproximadamente 55-60 caracteres) e até 960 pixels para a descrição em desktop (~155-160 caracteres).'
      },
      {
        question: 'Como é calculado o tempo estimado de leitura?',
        answer: 'Utilizamos a métrica padrão aceita internacionalmente de 200 palavras por minuto para leitura silenciosa e 130 palavras por minuto para leitura em voz alta.'
      }
    ]
  },
  {
    id: 'tool-juros-compostos',
    slug: 'calculadora-juros-compostos',
    title: 'Calculadora de Juros Compostos & Projeção Financeira',
    shortDesc: 'Calcule o poder dos juros compostos ao longo do tempo com aportes mensais, taxas personalizadas e gráficos comparativos.',
    longDesc: 'Simule seus investimentos de renda fixa, Tesouro Direto, CDBs e fundos imobiliários com precisão matemática. Compare o total investido do próprio bolso versus o lucro gerado pelos juros acumulados mês a mês.',
    category: 'financas',
    iconName: 'TrendingUp',
    tags: ['Finanças', 'Juros Compostos', 'Investimentos', 'Renda Fixa', 'Calculadora'],
    schemaType: 'WebApplication',
    usageCount: 8410,
    featured: true,
    seoTips: [
      'A constância dos aportes mensais é o principal motor do efeito bola de neve.',
      'A fórmula utilizada é M = P(1 + i)^t somada ao valor futuro da série de pagamentos uniformes.',
      'Permite simulação em base mensal ou anual com conversão instantânea.'
    ],
    faq: [
      {
        question: 'Qual a diferença entre juros simples e juros compostos?',
        answer: 'Nos juros simples, o rendimento incide apenas sobre o capital inicial. Nos juros compostos (juros sobre juros), o rendimento incide sobre o capital inicial somado a todos os juros acumulados nos períodos anteriores.'
      },
      {
        question: 'A calculadora desconta Imposto de Renda ou inflação?',
        answer: 'Esta ferramenta calcula o retorno nominal bruto padrão para que você tenha a base matemática exata dos aportes e taxas acordadas.'
      }
    ]
  },
  {
    id: 'tool-link-whatsapp',
    slug: 'gerador-link-whatsapp',
    title: 'Gerador de Link WhatsApp & QR Code',
    shortDesc: 'Crie links curtos personalizados do WhatsApp com mensagem pronta e QR Code para download e compartilhamento em campanhas.',
    longDesc: 'Gere links diretos no formato wa.me com número de telefone e texto de mensagem pré-formatado. Perfeito para anúncios no Instagram, bio do TikTok, páginas de vendas e atendimento ao cliente ágil.',
    category: 'comunicacao',
    iconName: 'MessageSquare',
    tags: ['WhatsApp', 'QR Code', 'Marketing', 'Vendas', 'Link Direto', 'Atendimento'],
    schemaType: 'WebApplication',
    usageCount: 7950,
    featured: true,
    seoTips: [
      'Links com mensagem pré-definida aumentam as conversões em até 35% ao quebrar a barreira do primeiro contato.',
      'Gera QR Code vetorial pronto para impressão em cartões de visita e banners.'
    ],
    faq: [
      {
        question: 'O link gerado expira em algum momento?',
        answer: 'Não. Os links criados seguem a API nativa oficial do WhatsApp (wa.me) e são permanentes enquanto o número continuar ativo.'
      }
    ]
  },
  {
    id: 'tool-senhas-fortes',
    slug: 'gerador-senhas-fortes',
    title: 'Gerador de Senhas Fortes & Medidor de Entropia',
    shortDesc: 'Gere senhas criptograficamente seguras e aleatórias com indicador de força, tempo para quebra e personalização de caracteres.',
    longDesc: 'Proteja suas contas e sistemas contra ataques de força bruta e dicionário. Gere senhas de alta entropia no seu dispositivo usando a API Web Crypto do navegador com zero transmissão pela rede.',
    category: 'utilitarios',
    iconName: 'KeyRound',
    tags: ['Segurança', 'Senhas', 'Criptografia', 'Entropia', 'Proteção Digital'],
    schemaType: 'SoftwareApplication',
    usageCount: 6120,
    featured: false,
    seoTips: [
      'Recomenda-se senhas com no mínimo 16 caracteres combinando maiúsculas, minúsculas, números e símbolos.',
      'Geração 100% client-side: nenhuma senha passa por servidores.'
    ],
    faq: [
      {
        question: 'Como sei que esta senha é realmente segura?',
        answer: 'A ferramenta utiliza window.crypto.getRandomValues, gerador de números pseudoaleatórios criptograficamente seguro (CSPRNG) implementado diretamente no motor do seu navegador.'
      }
    ]
  },
  {
    id: 'tool-formatador-json',
    slug: 'formatador-minificador-json',
    title: 'Formatador e Minificador de JSON & Validador',
    shortDesc: 'Embeleze, valide a sintaxe ou compacte arquivos JSON com detecção visual de erros e contagem de bytes instantânea.',
    longDesc: 'Ferramenta rápida e confiável para desenvolvedores e analistas. Identifique vírgulas faltantes, aspas incorretas, formate com 2 ou 4 espaços e reduza o payload de dados com a minificação para produção.',
    category: 'desenvolvimento',
    iconName: 'Code2',
    tags: ['JSON', 'Formatador', 'Minificador', 'Desenvolvimento', 'API', 'Parser'],
    schemaType: 'WebApplication',
    usageCount: 5210,
    featured: false,
    seoTips: [
      'Minificar JSON reduz o tamanho do pacote HTTP e melhora a velocidade da API.',
      'Validação de sintaxe em tempo real com mensagens de erro humanizadas.'
    ],
    faq: [
      {
        question: 'O JSON enviado é salvo no servidor?',
        answer: 'Nunca. O processamento é realizado estritamente na memória do seu navegador, garantindo sigilo absoluto mesmo para dados sensíveis de APIs.'
      }
    ]
  },
  {
    id: 'tool-meta-tags-seo',
    slug: 'gerador-meta-tags-seo',
    title: 'Gerador de Meta Tags SEO, Open Graph & Twitter Cards',
    shortDesc: 'Crie tags meta perfeitas para Google, Facebook, LinkedIn e Twitter/X com visualizador prévio e código pronto para colar.',
    longDesc: 'Garanta que seus artigos e páginas tenham uma apresentação impecável quando compartilhados nas redes sociais e nos resultados de busca do Google. Gera tags canônicas, og:image, og:description e twitter:card.',
    category: 'texto-seo',
    iconName: 'Share2',
    tags: ['SEO', 'Open Graph', 'Twitter Card', 'Meta Tags', 'HTML', 'Webmaster'],
    schemaType: 'WebApplication',
    usageCount: 4180,
    featured: false,
    seoTips: [
      'Imagens de Open Graph devem ter proporção 1.91:1 (idealmente 1200x630px) para evitar distorção.',
      'Sempre inclua a tag canonical para evitar penalidades de conteúdo duplicado.'
    ],
    faq: [
      {
        question: 'Onde devo colar essas tags no meu site?',
        answer: 'As tags geradas devem ser coladas dentro da seção <head> do arquivo HTML do seu site ou no gerenciador de cabeçalhos do seu CMS (WordPress, Webflow, etc.).'
      }
    ]
  },
  {
    id: 'tool-conversor-unidades',
    slug: 'conversor-unidades-medidas',
    title: 'Conversor Universal de Unidades & Armazenamento',
    shortDesc: 'Converta bytes, megabytes, gigabytes, temperatura, comprimento e velocidade com precisão matemática em tempo real.',
    longDesc: 'Conversor multifuncional e ágil para converter unidades do sistema métrico, imperial e grandezas de computação (Bytes, KB, MB, GB, TB, PB). Cálculos instantâneos à prova de falhas.',
    category: 'utilitarios',
    iconName: 'ArrowLeftRight',
    tags: ['Conversor', 'Bytes', 'Megabytes', 'Temperatura', 'Comprimento', 'Métrico'],
    schemaType: 'WebApplication',
    usageCount: 3890,
    featured: false,
    seoTips: [
      'Suporta conversões em base binária (1024) e decimal (1000) para armazenamento digital.',
      'Interface responsiva com cópia rápida do resultado com um clique.'
    ],
    faq: [
      {
        question: '1 GB equivale a 1000 MB ou 1024 MB?',
        answer: 'Na computação tradicional de memória RAM, 1 GB equivale a 1024 MB (Gibibyte/GiB). Na notação comercial de fabricantes de discos (HD/SSD), adota-se 1000 MB.'
      }
    ]
  }
];
