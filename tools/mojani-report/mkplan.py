# -*- coding: utf-8 -*-
import math
V={'A':(422.44,188.96),'B':(281.32,214.04),'C':(270.52,215.96),'D':(276.28,245.72),
   'E':(283.12,277.52),'F':(445.84,242.12),'G':(432.64,212.12),'H':(427.24,199.88),
   'P1':(284.56,229.64),'P2':(287.92,243.20)}
K=(25.4/72)*500/1000.0
POLY={'2457/1':['D','G','F','E'],'2457/2':['P1','H','G','P2'],
      '2457/3':['B','A','H','P1'],'2457/4':['C','B','P1','P2','D']}
AREA={'2457/1':164.06,'2457/2':62.30,'2457/3':62.30,'2457/4':10.54}
FILL={'2457/1':'var(--p1)','2457/2':'var(--p2)','2457/3':'var(--p3)','2457/4':'var(--p4)'}
OUTER=['C','B','A','H','G','F','E','D']
NB=[('सि.स.नं. 2460',309.0,198.0),('सि.स.नं. 2453/5',382.0,183.0),('सि.स.नं. 2461',263.0,198.5),
    ('सि.स.नं. 2463',250.0,266.0),('सि.स.नं. 2496/1',312.0,289.5),('सि.स.नं. 2496/2',370.0,280.0),
    ('सि.स.नं. 2496/3',424.0,267.5)]

FT=3.28084; SQFT=10.7639
def real(a,b): return math.hypot(V[a][0]-V[b][0],V[a][1]-V[b][1])*K*FT

def plan(theta_deg, S=5.0, road_len=4):
    th=math.radians(theta_deg); ct,st=math.cos(th),math.sin(th)
    def R(x,y): return (x*ct-y*st, x*st+y*ct)
    P={k:R(*[c*S for c in V[k]]) for k in V}
    def RP(x,y): return R(x*S,y*S)
    BB=[]
    def bb(x,y,w=0,h=0): BB.append((x-w,y-h)); BB.append((x+w,y+h))
    o=['@@TAG@@']
    for k,pl in POLY.items():
        o.append('<polygon points="%s" fill="%s" stroke="none"/>'%(
            ' '.join('%.1f,%.1f'%P[v] for v in pl), FILL[k]))
    for a,b in [('D','P2'),('P2','G'),('P1','H'),('B','P1'),('P1','P2')]:
        o.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="var(--accent)" '
                 'stroke-width="1.7" stroke-dasharray="8 4"/>'%(P[a]+P[b]))
    o.append('<polygon points="%s" fill="none" stroke="currentColor" stroke-width="2.6" '
             'stroke-linejoin="round"/>'%(' '.join('%.1f,%.1f'%P[v] for v in OUTER)))
    for v in OUTER+['P1','P2']:
        x,y=P[v]; bb(x,y,5,5)
        o.append('<circle cx="%.1f" cy="%.1f" r="3.2" fill="var(--surface)" stroke="currentColor" stroke-width="1.5"/>'%(x,y))
    gx=sum(P[v][0] for v in OUTER)/8; gy=sum(P[v][1] for v in OUTER)/8
    def cen(k):
        pl=POLY[k]; return (sum(P[v][0] for v in pl)/len(pl), sum(P[v][1] for v in pl)/len(pl))
    def dim(a,b,ref,mode,off,t=0.5,cls='dim'):
        (x1,y1),(x2,y2)=P[a],P[b]
        dx,dy=x2-x1,y2-y1; ln=math.hypot(dx,dy)
        nx,ny=dy/ln,-dx/ln
        mx,my=x1+dx*t,y1+dy*t
        d1=(mx+nx-ref[0])**2+(my+ny-ref[1])**2
        d2=(mx-nx-ref[0])**2+(my-ny-ref[1])**2
        if (mode=='toward' and d1>d2) or (mode=='away' and d1<d2): nx,ny=-nx,-ny
        px,py=mx+nx*off,my+ny*off
        ang=math.degrees(math.atan2(dy,dx))
        if ang>90: ang-=180
        if ang<-90: ang+=180
        txt='%.2f'%real(a,b)
        w=len(txt)*5.4+7; h=11
        ar=math.radians(ang)
        bb(px,py, abs(w*math.cos(ar))+abs(h*math.sin(ar)), abs(w*math.sin(ar))+abs(h*math.cos(ar)))
        o.append('<text x="%.1f" y="%.1f" transform="rotate(%.1f %.1f %.1f)" class="%s" '
                 'text-anchor="middle">%s</text>'%(px,py,ang,px,py,cls,txt))
    C=(gx,gy)
    for a,b in [('C','B'),('B','A'),('A','H'),('H','G'),('G','F'),('F','E'),('E','D'),('D','C')]:
        dim(a,b,C,'away',17, 0.72 if (a,b)==('D','C') else 0.5)
    dim('D','G',cen('2457/1'),'toward',13,0.34,'dim dim-in')
    dim('P2','G',cen('2457/2'),'toward',9,0.55,'dim dim-in')
    dim('P1','H',cen('2457/3'),'toward',9,0.34,'dim dim-in')
    dim('B','P1',cen('2457/3'),'toward',11,0.55,'dim dim-in')
    dim('P1','P2',cen('2457/2'),'toward',11,0.5,'dim dim-in')
    dim('P2','D',cen('2457/1'),'toward',18,0.50,'dim dim-in')
    def lerp(a,b,t): return (P[a][0]+(P[b][0]-P[a][0])*t, P[a][1]+(P[b][1]-P[a][1])*t)
    LT={'2457/1':(('D','G'),('E','F'),0.76),'2457/2':(('P2','G'),('P1','H'),0.78),
        '2457/3':(('P1','H'),('B','A'),0.76)}
    for k,(e1,e2,t) in LT.items():
        p=lerp(*e1,t); q=lerp(*e2,t); cx,cy=(p[0]+q[0])/2,(p[1]+q[1])/2
        bb(cx,cy,44,26)
        o.append('<text x="%.1f" y="%.1f" class="pl-no" text-anchor="middle">%s</text>'%(cx,cy-4,k))
        o.append('<text x="%.1f" y="%.1f" class="pl-ar" text-anchor="middle">%s चौ.फूट</text>'%(cx,cy+11,format(round(AREA[k]*SQFT,2),',')))
    # 2457/4 label outside with leader
    hx,hy=cen('2457/4')
    ux,uy=hx-gx,hy-gy; un=math.hypot(ux,uy); ux,uy=ux/un,uy/un
    lx,ly=hx+ux*112,hy+uy*112
    o.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>'%(hx+ux*86,hy+uy*86,hx,hy))
    bb(lx,ly,50,28)
    o.append('<text x="%.1f" y="%.1f" class="pl-no" text-anchor="middle">2457/4</text>'%(lx,ly-4))
    o.append('<text x="%.1f" y="%.1f" class="pl-ar" text-anchor="middle">113.45 चौ.फूट</text>'%(lx,ly+11))
    VL={'A':(1,-.5,15),'B':(-.4,-1,15),'C':(-1,-.7,15),'D':(-1,.3,15),'E':(-.7,1,15),'F':(1,.5,15),
        'G':(1,.5,15),'H':(1,-.3,15)}
    for v,(dx,dy,dr) in VL.items():
        vx,vy=R(dx,dy); x,y=P[v][0]+vx*dr,P[v][1]+vy*dr+4
        bb(x,y,11,9)
        o.append('<text x="%.1f" y="%.1f" class="vx%s" text-anchor="middle">%s</text>'%(
            x,y,' vx-in' if v.startswith('P') else '',v))
    for v,tgt in (('P1','H'),('P2','G')):
        ux2,uy2=P[tgt][0]-P[v][0],P[tgt][1]-P[v][1]; n2=math.hypot(ux2,uy2)
        x,y=P[v][0]+ux2/n2*30,P[v][1]+uy2/n2*30+4
        bb(x,y,12,9)
        o.append('<text x="%.1f" y="%.1f" class="vx vx-in" text-anchor="middle">%s</text>'%(x,y,v))
    for t_,x,y in NB:
        X,Y=RP(x,y); bb(X,Y,len(t_)*4.2,10)
        o.append('<text x="%.1f" y="%.1f" class="nb" text-anchor="middle">%s</text>'%(X,Y,t_))
    X,Y=RP(456,216); ra=66+theta_deg
    while ra>90: ra-=180
    while ra<-90: ra+=180
    bb(X,Y,42,42)
    o.append('<text x="%.1f" y="%.1f" class="nb" text-anchor="middle" transform="rotate(%.1f %.1f %.1f)">लागू रस्ता</text>'%(X,Y,ra,X,Y))
    x0=min(b[0] for b in BB); x1=max(b[0] for b in BB)
    y0=min(b[1] for b in BB); y1=max(b[1] for b in BB)
    # north arrow (right of content, near top) + scale bar (below content, left)
    nx,ny=R(0,-1)
    ax,ay=x1+34,y0+26
    ex,ey=ax+nx*34,ay+ny*34
    o.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="currentColor" stroke-width="1.7"/>'%(ax,ay,ex,ey))
    o.append('<polygon points="%.1f,%.1f %.1f,%.1f %.1f,%.1f" fill="currentColor"/>'%(
        ex+nx*8,ey+ny*8, ex-ny*5,ey+nx*5, ex+ny*5,ey-nx*5))
    o.append('<text x="%.1f" y="%.1f" class="nb" text-anchor="middle">उत्तर</text>'%(ax-nx*14,ay-ny*14+4))
    seg=(5.0/K)*S; sx,sy=x0,y1+34
    o.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="currentColor" stroke-width="2"/>'%(sx,sy,sx+seg,sy))
    for t_ in (0,1):
        o.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="currentColor" stroke-width="2"/>'%(sx+seg*t_,sy-5,sx+seg*t_,sy+5))
    o.append('<text x="%.1f" y="%.1f" class="nb" text-anchor="middle">5 मी. (प्रमाण 1:500)</text>'%(sx+seg/2,sy+18))
    x0=min(x0,ax-46,sx-4); x1=max(x1,ax+46,sx+seg+60)
    y0=min(y0,ay-46); y1=max(y1,sy+26)
    pad=10; x0-=pad; y0-=pad; x1+=pad; y1+=pad
    o[0]=('<svg viewBox="%.0f %.0f %.0f %.0f" role="img" aria-label="सि.स.नं. 2457 चा प्रमाणबद्ध नकाशा — '
          'चारही पोटहिस्से, प्रत्येक बाजूची मापे व लगत मिळकती" class="plan">'%(x0,y0,x1-x0,y1-y0))
    o.append('</svg>')
    return '\n'.join(o)

open('plan.svg','w').write(plan(0))
open('plan_portrait.svg','w').write(plan(90))
print('ok')
