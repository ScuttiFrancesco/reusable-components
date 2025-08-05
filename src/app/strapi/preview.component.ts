import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="data$ | async as data; else loading">
      <div *ngIf="data; else notFound">
        <h1>{{ data.titolo }} (Anteprima)</h1>
        
        <!-- Debug info -->
        <details style="margin: 20px 0; padding: 10px; background: #f0f0f0; border-radius: 5px;">
          <summary>🔍 Debug Info</summary>
          <pre>{{ data | json }}</pre>
        </details>
        
        <div [innerHTML]="getSafeHtml(data.new_editor)"></div>
      </div>
    </ng-container>

    <ng-template #loading>
      <p>⏳ Caricamento anteprima...</p>
    </ng-template>

    <ng-template #notFound>
      <p>❌ Contenuto non trovato o errore nel caricamento.</p>
    </ng-template>
  `,
  styles: []
})
export class PreviewComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  data$: Observable<any | null> | undefined;

  // Token per accedere ai draft - IMPORTANTE per preview!
  private token = '2ca8ee8d1713c9efc2b0a37bac2773f82b48ad01f03931da5e4148c9b788efaf48ae0f6afb7b7d1cf4cf68ed2438b4e410cad860a0f175db6337e08e09f3c63af3500ca3df810f53d264248276f029f3126d2fb858c2bedc167e7aa7817ac085923bc1525d4e515b4a58112dc3e40aeb67c1c8d21370f9a914ee656500a24ee8';

  // Metodo per sanitizzare l'HTML
  getSafeHtml(htmlContent: any): SafeHtml {
    if (!htmlContent) return '';
    const content = typeof htmlContent === 'string' ? htmlContent : String(htmlContent);
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  ngOnInit(): void {
    this.data$ = this.route.queryParamMap.pipe(
      switchMap(params => {
        const type = params.get('type');
        const slug = params.get('slug');

        if (!type || !slug) {
          console.error('Parametri mancanti!');
          this.router.navigate(['/404']);
          return of(null);
        }

        // Query per PREVIEW: deve includere i DRAFT (contenuti non pubblicati)
        // In Strapi v5, per i draft dobbiamo usare status=draft oppure includere tutti gli stati
        const apiUrl = `http://localhost:1337/api/${type}s?filters[slug][$eqi]=${encodeURIComponent(slug)}&status=draft&populate=*`;
        
        // Headers con autenticazione per accedere ai DRAFT
        const headers = {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        };
        
        console.log('🔍 API URL per DRAFT:', apiUrl);
        console.log('🔍 Cercando DRAFT con slug:', slug, 'in collection:', type);
        console.log('🔒 Con autenticazione per accedere ai draft');

        return this.http.get<{ data: any[] }>(apiUrl, { headers }).pipe(
          switchMap(response => {
            console.log('📦 Response completa:', response);
            
            if (response.data?.length > 0) {
              console.log('✅ Anteprima caricata con successo:', response.data[0]);
              return of(response.data[0]);
            } else {
              console.warn('⚠️ Nessun dato trovato per lo slug:', slug);
              console.warn('⚠️ Prova a controllare:');
              console.warn('   - Lo slug è corretto?');
              console.warn('   - Il contenuto è pubblicato o in draft?');
              console.warn('   - La collection si chiama veramente:', type + 's?');
              
              // FALLBACK: Proviamo a caricare TUTTI i contenuti per debug
              console.log('🔄 Tentativo FALLBACK: carico tutti i contenuti per debug...');
              const fallbackUrl = `http://localhost:1337/api/${type}s?status=draft&populate=*`;
              console.log('🔍 FALLBACK URL:', fallbackUrl);
              
              return this.http.get<{ data: any[] }>(fallbackUrl, { headers }).pipe(
                switchMap(fallbackResponse => {
                  console.log('📦 FALLBACK Response:', fallbackResponse);
                  console.log('📊 Numero totale di contenuti trovati:', fallbackResponse.data?.length || 0);
                  
                  if (fallbackResponse.data?.length > 0) {
                    console.log('📋 Lista slugs disponibili:');
                    fallbackResponse.data.forEach((item, index) => {
                      console.log(`   ${index + 1}. slug: "${item.slug}" - titolo: "${item.titolo}"`);
                    });
                    
                    // Cerchiamo manualmente il nostro slug
                    const found = fallbackResponse.data.find(item => 
                      item.slug === slug || 
                      item.slug?.toLowerCase() === slug.toLowerCase()
                    );
                    
                    if (found) {
                      console.log('✅ TROVATO con ricerca manuale!', found);
                      return of(found);
                    }
                  }
                  
                  // SECONDO FALLBACK: Prova senza filtri di stato (tutti i contenuti)
                  console.log('🔄 Secondo FALLBACK: provo senza filtri di stato...');
                  const noStatusUrl = `http://localhost:1337/api/${type}s?populate=*`;
                  console.log('🔍 No Status URL:', noStatusUrl);
                  
                  return this.http.get<{ data: any[] }>(noStatusUrl, { headers }).pipe(
                    switchMap(noStatusResponse => {
                      console.log('📦 No Status Response:', noStatusResponse);
                      console.log('📊 Contenuti senza filtro stato:', noStatusResponse.data?.length || 0);
                      
                      if (noStatusResponse.data?.length > 0) {
                        console.log('📋 Lista completa slugs (tutti gli stati):');
                        noStatusResponse.data.forEach((item, index) => {
                          console.log(`   ${index + 1}. slug: "${item.slug}" - titolo: "${item.titolo}" - publishedAt: ${item.publishedAt || 'DRAFT'}`);
                        });
                        
                        // Cerchiamo il nostro slug in tutti i contenuti
                        const foundInAll = noStatusResponse.data.find(item => 
                          item.slug === slug || 
                          item.slug?.toLowerCase() === slug.toLowerCase()
                        );
                        
                        if (foundInAll) {
                          console.log('✅ TROVATO nei contenuti senza filtro!', foundInAll);
                          return of(foundInAll);
                        }
                      }
                      
                      return of({ 
                        titolo: 'Contenuto non trovato', 
                        new_editor: `<p>⚠️ Nessun contenuto trovato per lo slug: <strong>${slug}</strong></p>
                                   <p>URL chiamato: <code>${apiUrl}</code></p>
                                   <p>Controlla che il contenuto esista e sia pubblicato.</p>
                                   <p>Contenuti totali nella collection: ${noStatusResponse.data?.length || 0}</p>` 
                      });
                    }),
                    catchError(noStatusErr => {
                      console.error('❌ Errore nel secondo fallback:', noStatusErr);
                      return of({ 
                        titolo: 'Errore completo', 
                        new_editor: `<p>❌ Nessun metodo di caricamento ha funzionato.</p>
                                   <p>Errore: ${noStatusErr.message || noStatusErr}</p>` 
                      });
                    })
                  );
                }),
                catchError(fallbackErr => {
                  console.error('❌ Errore anche nel fallback:', fallbackErr);
                  return of({ 
                    titolo: 'Errore nel fallback', 
                    new_editor: `<p>❌ Errore nel caricamento del fallback.</p>
                               <p>Dettagli: ${fallbackErr.message || fallbackErr}</p>` 
                  });
                })
              );
            }
          }),
          catchError(err => {
            console.error('❌ Errore nel recupero dell\'anteprima:', err);
            return of({ 
              titolo: 'Errore nel caricamento', 
              new_editor: `<p>❌ Errore nel caricamento del contenuto.</p>
                         <p>Dettagli: ${err.message || err}</p>` 
            });
          })
        );
      })
    );
  }
}